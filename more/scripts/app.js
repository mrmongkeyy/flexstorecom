

const flexstore = {
	init(){
		this.setAdmin();
		this.declare();
		this.handleUniqueId();
		this.initNavButtons();
		this.doglas.init();
	},
	declare(){
		this.body = find('body');
		this.root = find('#root');
		this.ahead = find('#ahead');
		this.abody = find('#abody');
		this.afooter = find('#afooter');
		this.navBox = find('#navbox div');
		this.navButtons = this.navBox.findall('div');
		this.bodyBox = this.abody.find('#bodybox');
	},
	initNavButtons(){
		this.navButtons.forEach(button=>{
			button.onclick = ()=>{
				this[`open${button.id}`]();
			}
		})
	},isAdmin:false,
	openNewServices(){
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.newServices());	
		}));
	},
	openExplore(){
		this.body.addChild(view.loading(async (loading)=>{
			const data = (await this.loadProduct()).val()||{};
			this.bodyBox.replaceChild(view.explore(data));
			loading.remove();	
		},false));
	},
	openDetails(){
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.openDetails());
		}));
	},
	openHelp(){
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.help());	
		}));
	},
	async loadProduct(){
		return this.doglas.do(['database','products','TRX','get']);
	},
	openDetail(data){
		this.temp.exploreScrollbarPosition = this.root.scrollTop;
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.productDetail(data))	
		}));
	},
	openChat(param,param2){
		this.body.addChild(view.loading(()=>{
			this.body.addChild(view.askOwnerChat(param,param2));
		}));
	},
	openNewDataWrited(param,tipe){
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.showNewTrxId(param,tipe));	
		}));
	},
	sendCopiedMessage(param){
		this.body.addChild(view.copied(param));
	},
	hash(param1,param2){
		const theparam = `${param1}.${param2}`;
		return `TRX/${md5(theparam)}`;
	},
	normalizeData(param){
		param.seller = (!param.sellerpassword)?false:true;
		delete param.sellerpassword;
		if(param.datacomponent)
			delete param.datacomponent;
		return param;
	},
	showDataDetails(param,loading){
		const actions = {
			'1true':'openDataMarketSeller',
			'1false':'openDataMarketBuyyer',
			'2true':'openRekberSeller',
			'2false':'openRekberBuyyer'
		}
		const controller = actions[param.tipeservices+param.seller];
		if(!controller){
			loading.remove();
			return this.body.addChild(view.oops('We are so sorry, sepertinya data yang anda minta tidak ditemukan!'));
		}
		this.bodyBox.replaceChild(view[controller](param,loading));	
	},
	openSellerEdit(param){
		this.body.addChild(view.loading(()=>{
			this.bodyBox.replaceChild(view.dataMarketSellerEdit(param));
		}))
	},
	setRootOverflow(param){
		this.root.style.overflow = param;
	},
	openProductInbox(param,param2){
		this.openChat(param,param2);
	},
	getCurrentUserUnique(){
		return localStorage.getItem('flexstoreuserid');
	},
	setCurrentUserUnique(param){
		localStorage.setItem('flexstoreuserid',param);
	},
	handleUniqueId(){
		let userUniqueId = this.getCurrentUserUnique();
		if(!userUniqueId){
			userUniqueId = `user/${getUniqueID()}`;
			this.setCurrentUserUnique(userUniqueId);
		}
		this.userUniqueId = userUniqueId;
	},
	setAdmin(){
		location.pathname.split('/').forEach(path=>{
			if(path==='admin')
				this.isAdmin = true;
		})
	},
	openStatusChanger(param,param2,param3){
		this.body.addChild(view.loading(()=>{
			this.body.addChild(view.changeProductStatus(param,param2,param3));
		}));
	},
	doOrder(param,param2,param3){
		if(param2)
			param2.remove();
		this.body.addChild(view.loading(()=>{
			this.body.addChild(view.confirmOrder(param,param3));
		}));
	},
	getOrderId(param){
		return md5(`${param.pSignature}.${param.buyyerPass}`);
	},
	requestOrder(data){
		return new Promise((resolve,reject)=>{
			cOn.get({
        url:`https://gemastores.000webhostapp.com/order/?sig=${data.sig}&pm=${data.pm}&bp=${data.bp}`,
        onload(){
          resolve(this);
        }
      })
		})
	},
	temp:{

	},
  doglas:{
    config:{
      apiKey: "AIzaSyA6kChckNz-oLevwOzC8i-ijtyO-ookCZY",
		  authDomain: "tesdb-1f851.firebaseapp.com",
		  databaseURL: "https://tesdb-1f851-default-rtdb.asia-southeast1.firebasedatabase.app",
		  projectId: "tesdb-1f851",
		  storageBucket: "tesdb-1f851.appspot.com",
		  messagingSenderId: "56960945752",
		  appId: "1:56960945752:web:7f7a28d6ab482bc351442d"
    },
    init(){
      this.app = this.doglas.initializeApp(this.config);
      //this.auth = this.doglas.auth(this.app);
      flexstore.openExplore();
    },
    doglas:firebase,
    do(args){ //[db/orsomething,parentchild,child,get/orupdate,datapass].
      return this.doglas[args[0]]().ref(`${args[1]}/${args[2]}`)[args[3]](args[4]);
    },
    save(args){
      return this.doglas.storage().ref().child(args[0]).put(args[1],args[2]);
    },
    get(refId){
      return this.doglas.database().ref(refId);
    }
  },
	listener:{
		listens:{},status:{},
		add(param,paramagain,callback){
			//activing the listener.
			flexstore.doglas.get(param).on('value',callback);
			this.listens[paramagain] = param;
			this.status[paramagain] = 'On';
			this.autoRemove(paramagain);
		},
		remove(param){
			flexstore.doglas.get(this.listens[param]).off('value');
			this.status[param] = 'Off';
		},
		autoRemove(param){
			for(let i in this.status){
				if(this.status[i]==='On' && i!==param){
					this.remove(i);
				}
			}
		}
	}
}