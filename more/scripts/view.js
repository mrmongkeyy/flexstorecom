const view = {
	explore(data){
		return this.listBox(data);
	},
	listBox(data){
		return makeElement('div',{
			style:`
				display:flex;
      	width:100%;
      	flex-direction: column;
      	justify-content: flex-start;
      	align-items: center;
      	background:var(--black);
      	border-radius:10px;
      	padding:10px;
      	gap:10px;
			`,
			id:'listBox',
			innerHTML:`
				<div style="
	        width: 100%;
          height: auto;
          justify-content: flex-end;
          padding-bottom: 20px;
          flex-direction: initial;
          gap: 10px;
          display:flex;
	      ">
          <div style="
            width:100%;
            height: 100%;
            background: var(--brown);
            border-radius: 10px;
            display:flex;flex-direction:initial;
          ">
            <input placeholder="Masukan Judul..." style=background:var(--brown);border:none;>
          </div>
	        <div style="
	          padding:5px;
	          border-radius: 10px;
	          cursor:pointer;
	        ">
	          <img src=${flexstore.isAdmin?'..':'.'}/more/media/config.png>
	        </div>
	      </div>
			`,
			onadded(){
				this.arrayData = objToArray(data).split(2);
				this.generateData();
        this.fixScrollBarPosition();
			},
      puttedElement:0,
			generateData(){
        this.arrayData.forEach(item=>{
          this.addChild(view.box(item));
        })
        if(this.puttedElement===0){
          this.addChild(view.noData());
        }
			},
      fixScrollBarPosition(){
        if(flexstore.temp.exploreScrollbarPosition){
          flexstore.root.scrollTo(0,flexstore.temp.exploreScrollbarPosition);
        }
      }
		})
	},
	box(data){
		return makeElement('div',{
			style:`
				min-height:100px;
        width:100%;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        flex-direction: initial;
        align-items: flex-start;
        background: var(--black);
			`,
			onadded(){
				data.forEach(item=>{
					if(item.status===1){
            this.addChild(view.boxInSide(item));
				    this.parent.puttedElement += 1; 
          }
        })
        this.displaySet(innerWidth);
			},
      displaySet(w){
        if(w<700){
          this.style.flexDirection = 'column';
        }else{
          this.style.flexDirection = 'initial';
        }
      },
      onScreenChange(w,h){
        this.displaySet(w);
      }
		})
	},
	boxInSide(data){
		return makeElement('div',{
			style:`
				background:var(--gray);
        width:50%;
        height:auto;
        border-radius:10px;
        position:relative;
        color:gray;
        flex-direction:column;
        display:flex;
			`,
      onmouseover(){
        this.seeDetail.show('flex');
      },
      onmouseleave(){
        this.seeDetail.hide();
      },
			innerHTML:`
				<div style="
          height:70%;
          width: 100%;
          border-radius: 10px 10px 0 0;
          background:gray;
          overflow: hidden;
        ">
          <img src=${data.thumbnail[0]} style="
            width:100%;
            height:100%;
            object-fit: cover;
          ">
        </div>
        <div style="
          height:30%;
          width:100%;
          border-radius:0 0 10px 10px;
          flex-direction:column;
        " class=productBody>
          <div style="
            width: 90%;
            display: flex;
            align-items: flex-start;
            padding: 5%;
            height: auto;
            padding-bottom:0;
          " class=productHeader>
            ${data.title}
          </div>
          <div style="
            width: 90%;
            padding: 5%;
            justify-content: space-between;
            align-items: flex-start;
            height: auto;
            flex-direction: initial;
            display:flex;
          ">
            <div>By ${data.sumbitname}</div>
            <div>Rp. ${getPrice(data.price)}</div>
          </div>
        </div>
        <div style="
          position: absolute;
          background: var(--tblack);
          width: 100%;
          height: 100%;
          display: none;
          align-items: center;
          justify-content: center;
        " id=seedetail>
          <div style="
            background:var(--gray);
            padding:10px;
            border-radius:10px;
            cursor:pointer;
            color:var(--yellow);
            gap:10px;
            flex-direction:column;
            display:flex;
            align-items:center;
          ">
            <img src=${flexstore.isAdmin?'..':'.'}/more/media/seedetail.png style="width:16px;height:16px;object-fit:contain;">
            <span>Lihat Detail</span>
          </div>
        </div>
			`,
      onadded(){
        this.seeDetail = this.find('#seedetail');
        this.detailButton = this.seeDetail.find('div');
        this.detailButton.onclick = ()=>{
          flexstore.openDetail(data);
        }
        this.displaySet(innerWidth);
      },
      displaySet(w){
        if(w<700){
          this.style.width = '100%';
        }else{
          this.style.width = '50%';
        }
      },
      onScreenChange(w,h){
        this.displaySet(w);
      }
		})
	},
	newServices(){
		return makeElement('div',{
			style:`
				padding:5%;
        width:90%;
        background: var(--gray);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color:gray;
			`,
			innerHTML:`
				<div style=font-size:24px;width:96%;padding:2%;align-items:flex-start;margin-bottom:20px;>Isi Data Dengan Benar!</div>
        <div style="width:96%;padding:2%;">
          <div style="
            width:100%;
            align-items: flex-start;
            display: flex;
            margin-bottom:20px;
            flex-direction:column;
          ">
            <div style=margin-bottom:5px;>Nama Anda</div>
            <div style=width:100%;display:flex;flex-direction:initial;>
              <input id=sumbitname placeholder="Masukan Nama Anda!" class="1 2">
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            display: flex;
            margin-bottom:20px;
            flex-direction:column;
          ">
            <div style=margin-bottom:5px;>Tipe Service</div>
            <div style=width:100%;display:flex;flex-direction:initial;>
              <select id=tipeservices class="1 2">
                <option value=0>Pilih Service</option>
                <option value=1>Sell Data</option>
                <option value=2>Rekber Service</option>
              </select>
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            display: none;
            margin-bottom:20px;
            flex-direction:column;
          " id=datasell>
            <div style=margin-bottom:20px;>Sell Data</div>
            <div style=width:100%;>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Nama Produk</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input placeholder="Masukan Nama Produk Yang Ingin Kamu Jual" id=title class=1>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Deskripsi Produk</div>
                <div style=width:100%;>
                  <textarea placeholder="Masukan Deskripsi Produk Yang Ingin Kamu Jual" id=description class=1></textarea>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Isi Produk ( id and password ) <span style=font-size:11px;color:var(--yellow);> Jika file tambahkan file!</span></div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <textarea placeholder="Masukan Komponen Produk Yang Ingin Kamu Jual, example: id and password" id=datacomponent class=1></textarea>
                </div>
                <div style=display:flex;gap:10px;align-items:center;margin-top:10px;>
                  <div class=button style=white-space:nowrap;>Tambahkan File</div>
                  <div style=width:100%;>0 file telah ditambahkan</div>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Harga Jual ( we will get 5% of it )</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input placeholder="Masukan Harga Produk Yang Ingin Kamu Jual" type=number id=price class=1>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Tambahkan Produk Preview</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input type=file multiple id=thumbnail class=1>
                </div>
                <div style="
                  width:100%;
                  margin-bottom:10px;
                  display:flex;
                  overflow:auto;
                  margin-top:10px;
                  align-items:center;
                  border-radius:10px;
                " id=datapreview>

                </div> 
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Seller Password</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input type=password placeholder="Masukan Password Anda, Akan Diminta Nanti" id=sellerpassword class=1>
                </div>
              </div>
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            display: none;
            margin-bottom:20px;
            flex-direction:column;
          " id=rekber>
            <div style=margin-bottom:20px;>Rekber Service</div>
            <div style=width:100%;>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Nama Transaksi</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input placeholder="Masukan Nama Transaksi Yang Ingin Kamu Lakukan" id=title class=2>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Deskripsi Transaksi</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <textarea placeholder="Masukan Deskripsi Transaksi Yang Ingin Kamu Lakukan" id=title class=2></textarea>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Harga Jual ( we will get 10% of it )</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input placeholder="Masukan Harga Data Yang Ingin Kamu Jual" type=number id=price class=2>
                </div>
              </div>
              <div style="
                width:100%;
                align-items: flex-start;
                margin-bottom: 10px;
              ">
                <div style=margin-bottom:5px;>Seller Password</div>
                <div style=width:100%;display:flex;flex-direction:initial;>
                  <input type=password placeholder="Masukan Password Anda, Akan Diminta Nanti" id=sellerpassword class=2>
                </div>
              </div>
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            display: none;
            flex-direction:initial;
          " id=submitbutton>
            <div class="button fullsmall"><span style=margin-top:5px;>Submit Data</span></div>
          </div>
        </div>
			`,
      onadded(){
        this.declare();
        this.selectHandler();
        this.thumbnailPreviewHandler();
        this.initButton();
      },
      declare(){
        this.tipeservices = this.find('#tipeservices');
        this.datasell = this.find('#datasell');
        this.rekber = this.find('#rekber');
        this.submitbutton = this.find('#submitbutton');
        this.thumbnailpicker = this.find('#thumbnail');
        this.datapreview = this.find('#datapreview');
      },
      selectHandler(){
        this.tipeservices.onchange = ()=>{
          this.tipeserviceshandler(this.tipeservices.value);
        }
      },
      tipeserviceshandler(param){
        this.serviceTipe = param;
        switch(param){
          case "1":
            this.datasell.show('flex');
            this.rekber.hide();
            this.submitbutton.show('flex');
            break;
          case "2":
            this.rekber.show('flex');
            this.datasell.hide();
            this.submitbutton.show('flex');
            break;
          default:
            this.rekber.hide();
            this.datasell.hide();
            this.submitbutton.hide();
            break;
        }
      },
      initButton(){
        this.submitbutton.onclick = ()=>{
          this.submitbuttonfunction();
        }
      },
      collectData(){
        const data = {thumbnail:{},valid:true,status:0,chatRoom:{}};

        //collecting diffrent data.

        //getting value of input.
        this.findall('input').forEach(input=>{
          if(input.classList.contains(this.serviceTipe)){
            data[input.id] = input.value;
            if(input.type==='file'){
              data[input.id] = objToArray(input.files);
            }
          }
        })
        this.findall('select').forEach(select=>{
          if(select.classList.contains(this.serviceTipe)){
            data[select.id] = select.value;
          }
        })
        this.findall('textarea').forEach(textarea=>{
          if(textarea.classList.contains(this.serviceTipe)){
            data[textarea.id] = textarea.value;
          }
        })

        //validating data. make sure no empty one.
        for(let i in data){
          if(typeof data[i] === 'string' && data[i].length === 0){
            data.valid = false;
            data.checkingMsg = 'Mohon isi semua data dengan benar!';
          }
        }
        if(this.serviceTipe === '1' && data.thumbnail.length===0){
          data.valid = false;
          data.checkingMsg = 'Mohon sertakan setidaknya 1 thumbnail!'
        }
        return data;
      },
      thumbnailPreviewHandler(){
        this.thumbnailpicker.onchange = ()=>{
          this.datapreview.clear();
          objToArray(this.thumbnailpicker.files).forEach(item=>{
            const fs = new FileReader();
            fs.onload = ()=>{
              this.datapreview.addChild(makeElement('div',{
                innerHTML:`
                  <img src=${fs.result}>
                `
              }))
            }
            fs.readAsDataURL(item);
          })
        }
      },
      submitbuttonfunction(){
        const data = this.collectData();
        if(!data.valid){
          return flexstore.body.addChild(view.oops(data.checkingMsg));
        }

        delete data.valid;

        const upData = async (param,loading)=>{
          data.trxId = `TRX/${getUniqueID()}`;
          data.signature = flexstore.hash(data.trxId,data.sellerpassword);
          await flexstore.doglas.do(['database',param,data.signature,'set',data]);
          flexstore.openNewDataWrited(data.trxId,this.serviceTipe);
          loading.remove();
        }

        if(this.serviceTipe === '1'){
          //handling thumbnail
          flexstore.body.addChild(view.loading(async (loading)=>{
            let i=0,url=[];
            const upThumbnail = async ()=>{
              const uploadedfile = await flexstore.doglas.save([data.thumbnail[i].name,data.thumbnail[i],data.thumbnail[i].type]);
              url.push(await uploadedfile.ref.getDownloadURL());
              i += 1;
              if(i<data.thumbnail.length){
                return upThumbnail();
              }
              data.thumbnail = url;
              upData('products',loading);
            }
            upThumbnail();
          },false))
        }else{
          upData('rekber');
        }
      }
		})
	},
	productDetail(data){
		return makeElement('div',{
			style:`
				background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
			`,
			innerHTML:`
				<div style="
          width: 96%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          border-radius: 10px;
          margin-bottom: 30px;
          scrollbar-width: thin;
          display: flex;
          scrollbar-color:
          gray var(--gray);
          padding: 2%;
          background: var(--black);
          justify-content: flex-start;
        " id=thumbnail>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
        ">
          ${data.title}
        </div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
          flex-wrap:wrap;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:${flexstore.isAdmin?'none':'flex'};
            align-items:center;
            justify-content:space-between
          " id=order>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/buy.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Order</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=askowner>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:21px;height:21px;
          "><span style=margin-top:5px;>Tanya Owner</span></div>
          <div style="
            background:red;
            color:white;
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:${flexstore.isAdmin?'flex':'none'};
            align-items:center;
            justify-content:space-between
          " id=changestatus>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/change.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Ubah Status</span></div>
        </div>
			`,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails()
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.askownerbutton = this.find('#askowner');
        this.csButton = this.find('#changestatus');
        this.orderButton = this.find('#order');
      },
      eventSet(){
        this.askownerbutton.onclick = ()=>{this.askOwner()}
        this.csButton.onclick = ()=>{this.changeStatus()}
        this.orderButton.onclick = ()=>{this.order()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                flexstore.setRootOverflow('hidden');
                flexstore.root.scrollTo(0,0);
                this.doFull();
              }else{
                flexstore.setRootOverflow('auto');
                flexstore.root.scrollTo(0,0);
                this.unFull();
              }
            }
          }))
        })
      },
      askOwner(){
        flexstore.openChat(data.signature,flexstore.isAdmin);
      },
      changeStatus(){
        flexstore.openStatusChanger(data.signature,data.status,data.adminNotes);
      },
      order(){
        flexstore.doOrder(data);
      }
		})
	},
	askOwnerChat(param,param2){
		return makeElement('div',{
			style:`
				width: 100%;
	      height: 100%;
	      background:var(--tblack);
	      position: absolute;
	      left: 0;top: 0;
	      display: flex;
	      align-items: center;
	      justify-content: center;
        z-index:1;
			`,
			innerHTML:`
			<div class=chatBox>
        <div style="
          background: var(--brown);
          border-bottom: 1px solid var(--black);
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding:20px;
          color:gray;
        ">
          <div>Ask Owner</div>
          <div style="
            width:24px;
            height:24px;
            cursor:pointer;
          " id=closethis>
            <img src=${flexstore.isAdmin?'..':'.'}/more/media/grayclose.png style="
              width:100%;
              height:100%;
            ">
          </div>
        </div>
        <div style="
          height: 100%;
          padding:20px;
          overflow: auto;
          scrollbar-width:thin;
          scrollbar-color:var(--black) var(--gray);
        " id=chatplace>
        </div>
        <div style="
          border-top: 1px solid var(--black);
          background:var(--brown);
          border-radius:0 0 10px 10px;
          padding:20px;
          display: flex;
          gap:10px;
          align-items: flex-start;
        ">
          <div style="
            width: 100%;
          ">
            <textarea placeholder="Tuliskan Sesuatu..." style="height:32px;resize: vertical;min-height: 32px;"></textarea>
          </div>
          <div style="
            background: var(--yellow);
            padding:15px;
            border-radius: 10px;
            cursor: pointer;
          " id=sendbutton>
            Send
          </div>
        </div>
      </div>
			`,
      onadded(){
        this.declare();
        this.event();

        this.enterDown();


        this.loadMessage();
        console.log(param,param2);
      },
      declare(){
        this.sendbutton = this.find('#sendbutton');
        this.messageArea = this.find('textarea');
        this.chatPlace = this.find('#chatplace');
        this.chatId = flexstore.userUniqueId;
      },
      event(){
        //closebutton
        this.find('#closethis').onclick = ()=>{
          this.remove();
        }
        this.sendbutton.onclick = ()=>{
          this.buttonClickEvent();
        }
      },
      buttonClickEvent(){

      },
      keyDown:{},
      enterDown(){
        this.messageArea.onfocus = ()=>{
          this.messageArea.onkeydown = (e)=>{
            this.keyDown[e.key] = true;

            if(!this.keyDown.Shift && this.keyDown.Enter){
              this.send();
            }
          }
          this.messageArea.onkeyup = (e)=>{
            delete this.keyDown[e.key];
          }
        }
      },
      async send(){
        const msg = {
          value:this.messageArea.value,
          msgId:`msgid${getUniqueID()}`,
          time:getTime(),
          from:(!param2)?this.chatId:(flexstore.isAdmin)?'Admin':'Owner'
        }

        //getting the latest message.
        let msgsGlobal = (await flexstore.doglas.do(['database','products',`${param}/inbox`,'get'])).val()||[];
        if(msgsGlobal.length > 20)msgsGlobal = []
        msgsGlobal.push(msg);
        //set the latest data.
        await flexstore.doglas.do(['database','products',`${param}/inbox`,'set',msgsGlobal]);

        //this.putMsg({from:this.chatId,message:msg,time:getTime()});
        this.messageArea.value = '';
      },
      async loadMessage(){
        //load the data.
        const oldMsgs = (await flexstore.doglas.do(['database','products',`${param}/inbox`,'get'])).val()||[];

        oldMsgs.forEach((msg)=>{
          this.putMsg(msg);
        });

        this.initRealtime();
      },
      initRealtime(){
        flexstore.listener.add(`products/${param}/inbox`,'chatlistener',(snapshot)=>{
          const data = snapshot.val();
          if(!data||this.puttedMsgs.includes(data[data.length-1].msgId))return;
          this.putMsg(data[data.length-1]);
        })
      },
      puttedMsgs:[],
      putMsg(param){
        let alignMsg,topData,background,color;
        if(!flexstore.isAdmin){
          if(param2 && param.from == 'Owner'){
            //for owner.
            alignMsg = 'flex-end';
            topData = `<span id=time>${SmartTime(param.time)}</span>, You`;
            background = 'var(--yellow)';
            color = 'var(--black)';
          }else{
            //not owner
            if(param.from === this.chatId && !param2){
              //not owner and chat id is the same.
              alignMsg = 'flex-end';
              topData = `<span id=time>${SmartTime(param.time)}</span>, You`;
              background = 'var(--yellow)';
              color = 'var(--black)';
            }else{
              //not owner and chat id is diffrent.
              alignMsg = 'flex-start';
              topData = `${param.from}, <span id=time>${SmartTime(param.time)}</span>`;
              background = 'var(--brown)';
              color = 'gray';
            }
          }  
        }else{
          if(param.from === 'Admin'){
            //not owner and chat id is the same.
            alignMsg = 'flex-end';
            topData = `<span id=time>${SmartTime(param.time)}</span>, You`;
            background = 'var(--yellow)';
            color = 'var(--black)';
          }else{
            //not owner and chat id is diffrent.
            alignMsg = 'flex-start';
            topData = `${param.from}, <span id=time>${SmartTime(param.time)}</span>`;
            background = 'var(--brown)';
            color = 'gray';
          }
        }
        this.chatPlace.addChild(makeElement('div',{
          style:`
            display:flex;
            flex-direction:column;
            align-items:${alignMsg};
            width:100%;
          `,
          innerHTML:`
            <div style="
              font-size:11px;
              color:gray;
              margin-bottom:5px;
            " id=topdata>${topData}</div>
            <div style="
              padding:10px;
              border-radius:20px;
              margin-bottom:20px;
              background:${background};
              color:${color};
            ">${param.value}</div>
          `,time:param.time,chatId:this.chatId,
          onadded(){
            this.timeSpan = this.find('#time');
            //updating time / 2 minute
            setInterval(()=>{
              this.time += 60000;
              this.timeSpan.innerHTML = `${SmartTime(this.time)}`;
            },60000)

            console.log(this.parent.puttedMsgs);
            this.parent.puttedMsgs.push(param.msgId);

            this.scrollIntoView();
          }
        }))
      }
		})
	},
	openDetails(){
		return makeElement('div',{
			style:`
				background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        align-items: flex-start;
        flex-direction:column;
			`,
			innerHTML:`
        <div style="
          width:100%;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-direction:column;
        ">
          <div style="margin-bottom: 5px;">Services Details</div>
          <div style="width: 100%;display:flex;flex-direction:initial;">
            <select id=servicetipe>
              <option value=0>Pilih Service</option>
              <option value=1>Rekber System</option>
              <option value=2>Data Market</option>
            </select>
          </div>
        </div>
        <div style=width:100%;align-items:flex-start;display:none;flex-direction:column; id=rekberparent>
          <div style=margin-bottom:20px;>Rekber Service!</div>
          <div style="
            width:100%;
            align-items: flex-start;
            margin-bottom: 20px;flex-direction:column;
          ">
            <div style="margin-bottom: 5px;">ID Transaksi</div>
            <div style="width: 100%;display:flex;flex-direction:initial;">
              <input placeholder="Masukan ID Transaksi Anda..." id=rekbertrxid>
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            margin-bottom: 20px;flex-direction:column;
          ">
            <div style="margin-bottom: 5px;">Your Role</div>
            <div style="width: 100%;display:flex;flex-direction:initial;">
              <select id=rekberrole>
                <option value=0>Pilih Role</option>
                <option value=1>Seller</option>
                <option value=2>Buyyer</option>
              </select>
            </div>
          </div>
          <div style="
            margin-bottom: 20px;
            width:100%;
            align-items: flex-start;
            display:none;
          " id=rekbersellerpassword>
            <div style="
              width: 100%;
              align-items: flex-start;flex-direction:column;
            ">
              <div style="margin-bottom: 5px;">Seller Password</div>
              <div style="width: 100%;display:flex;flex-direction:initial;">
                <input placeholder="Masukan Seller Password Anda..." type=password id=rekberinputsellerpass>
              </div>
            </div>
          </div>
          <div style="
            margin-bottom: 20px;
            width:100%;
            align-items: flex-start;
            display:none;
          " id=rekberbuyyerpassword>
            <div style="
              width: 100%;
              align-items: flex-start;flex-direction:column;
            ">
              <div style="margin-bottom: 5px;">Buyyer Password</div>
              <div style="width: 100%;display:flex;flex-direction:initial;">
                <input placeholder="Masukan Buyyer Password Anda..." type=password id=rekberinputbuyyerpass>
              </div>
            </div>
          </div>
        </div>
        <div style=width:100%;align-items:flex-start;display:none;flex-direction:column; id=datamarketparent>
          <div style=margin-bottom:20px;>Data Market Service!</div>
          <div style="
            width:100%;
            align-items: flex-start;
            margin-bottom: 20px;flex-direction:column;
          ">
            <div style="margin-bottom: 5px;">ID Transaksi</div>
            <div style="width: 100%;display:flex;flex-direction:initial;">
              <input placeholder="Masukan ID Transaksi Anda..." id=datamarkettrxid>
            </div>
          </div>
          <div style="
            width:100%;
            align-items: flex-start;
            margin-bottom: 20px;flex-direction:column;
          ">
            <div style="margin-bottom: 5px;">Your Role</div>
            <div style="width: 100%;display:flex;flex-direction:initial;">
              <select id=datamarketrole>
                <option value=0>Pilih Role</option>
                <option value=1>Seller</option>
                <option value=2>Buyyer</option>
              </select>
            </div>
          </div>
          <div style="
            margin-bottom: 20px;
            width:100%;
            align-items: flex-start;
            display:none;
          " id=datamarketsellerpassword>
            <div style="
              width: 100%;
              align-items: flex-start;flex-direction:column;
            ">
              <div style="margin-bottom: 5px;">Seller Password</div>
              <div style="width: 100%;display:flex;flex-direction:initial;">
                <input placeholder="Masukan Seller Password Anda..." type=password id=datamarketinputsellerpass>
              </div>
            </div>
          </div>
          <div style="
            margin-bottom: 20px;
            width:100%;
            align-items: flex-start;
            display:none;
          " id=datamarketbuyyerpassword>
            <div style="
              width: 100%;
              align-items: flex-start;flex-direction:column;
            ">
              <div style="margin-bottom: 5px;">Buyyer Password</div>
              <div style="width: 100%;display:flex;flex-direction:initial;">
                <input placeholder="Masukan Buyyer Password Anda..." type=password id=datamarketinputbuyyerpass>
              </div>
            </div>
          </div>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          display: none;
          flex-direction:initial;
        " id=prosesbuttonparent>
          <div class="button fullsmall"><span style=margin-top:5px;>Cek Data</span></div>
        </div>
			`,
      onadded(){
        this.declare();
        this.selectEvent();
      },
      declare(){
        this.prosesbuttonparent = this.find('#prosesbuttonparent');
        this.datamarketparent = this.find('#datamarketparent');
        this.rekberparent = this.find('#rekberparent');
        this.rekberrole = this.find('#rekberrole');
        this.datamarketrole = this.find('#datamarketrole');
        this.servicetipe = this.find('#servicetipe');
        this.datamarketbuyyerpassword = this.find('#datamarketbuyyerpassword');
        this.datamarketsellerpassword = this.find('#datamarketsellerpassword');
        this.rekbersellerpassword = this.find('#rekbersellerpassword');
        this.rekberbuyyerpassword = this.find('#rekberbuyyerpassword');
        this.datamarkettrxid = this.find('#datamarkettrxid');
        this.rekbertrxid = this.find('#rekbertrxid');
        this.rekberinputbuyyerpass = this.find('#rekberinputbuyyerpass');
        this.rekberinputsellerpass = this.find('#rekberinputsellerpass');
        this.datamarketinputbuyyerpass = this.find('#datamarketinputbuyyerpass');
        this.datamarketinputsellerpass = this.find('#datamarketinputsellerpass');

        this.prosesbuttonparent.onclick = ()=>{
          this.checkData();
        }
      },
      selectEvent(){
        //tipe select
        this.servicetipe.onchange = ()=>{
          this.servicetipehandler(this.servicetipe.value);
        }
        this.datamarketrole.onchange = ()=>{
          this.datamarketrolehandler(this.datamarketrole.value);
        }
        this.rekberrole.onchange = ()=>{
          this.rekberrolehandler(this.rekberrole.value);
        }
      },
      servicetipehandler(param){
        this.serviceTipe = param;
        //this.prosesbuttonparent.hide();
        switch(param){
          case "1":
            this.datamarketparent.hide();
            this.rekberparent.show('flex');
            break;
          case "2":
            this.rekberparent.hide();
            this.datamarketparent.show('flex');
            break;
          default:
            this.datamarketparent.hide();
            this.datamarketrole.value = '0';
            this.datamarketsellerpassword.hide();
            this.datamarketbuyyerpassword.hide();
            this.rekberparent.hide();
            this.rekberrole.value = '0';
            this.rekbersellerpassword.hide();
            this.rekberbuyyerpassword.hide();
            this.prosesbuttonparent.hide();
            break;
        }
      },
      rekberrolehandler(param){
        this.role = param;
        switch(param){
          case "1":
            this.rekbersellerpassword.show('flex');
            this.rekberbuyyerpassword.hide();
            this.prosesbuttonparent.show('flex');
            break;
          case "2":
            this.rekbersellerpassword.hide();
            this.rekberbuyyerpassword.show('flex');
            this.prosesbuttonparent.show('flex');
            break;
          default:
            this.rekberbuyyerpassword.hide();
            this.rekbersellerpassword.hide();
            this.prosesbuttonparent.hide();
            break;
        }
      },
      datamarketrolehandler(param){
        this.role = param;
        switch(param){
          case "1":
            this.datamarketbuyyerpassword.hide();
            this.datamarketsellerpassword.show('flex');
            this.prosesbuttonparent.show('flex');
            break;
          case "2":
            this.datamarketsellerpassword.hide();
            this.datamarketbuyyerpassword.show('flex');
            this.prosesbuttonparent.show('flex');
            break;
          default:
            this.datamarketsellerpassword.hide();
            this.datamarketbuyyerpassword.hide();
            this.prosesbuttonparent.hide();
            break;
        }
      },
      getPassword(){
        return (this.serviceTipe==='1')
              ?(this.role==='1')?this.rekberinputsellerpass.value
              :this.rekberinputbuyyerpass.value
              :(this.role==='1')?this.datamarketinputsellerpass.value
              :this.datamarketinputbuyyerpass.value
      },
      collectData(){
        const trxId = (this.serviceTipe==='1')?this.rekbertrxid.value:this.datamarkettrxid.value;
        const password = this.getPassword();
        const data = {
          tipeService:(this.serviceTipe==='1')?'rekber':'products',
          signature:(this.role==='1')?flexstore.hash(trxId,password):flexstore.getOrderId({pSignature:trxId,buyyerPass:password}),
          role:this.role,
          trxId
        }
        return data;
      },
      checkData(){
        const data = this.collectData();
        let twoparam = data.tipeService;
        if(data.role!=='1'){
          //role is buyyer so twoparam must be diffrent.
          twoparam = `${data.tipeService}/${data.trxId}/orderList/OId/`;
        }
        //now requesting the data.
        flexstore.body.addChild(view.loading(async (loading)=>{
          const requestedData = flexstore.normalizeData((await flexstore.doglas.do(['database',twoparam,data.signature,'get'])).val()||{});
          console.log('databack',requestedData);
          if(data.role==='1' || objToArray(requestedData).length===1)
            return flexstore.showDataDetails(requestedData,loading);
          flexstore.doOrder(requestedData,loading,true);
        },false))
      }
		})
	},
	help(){
		return makeElement('div',{
			style:`
				background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        align-items: flex-start;
			`,
			innerHTML:`
				<div style="
          margin-bottom:20px
        ">Apa itu FlexStore.com?</div>
        <div style="
          margin-bottom:20px;
        ">
          FlexStore.com dalah website marketplace data dan rekening bersama ( rekber ).
          FlexStore.com Mengutamakan keamanan dan kenyamanan dalam bertransaksi, semua sisi dilindungi.
          Seller dan Buyyer dapat bertransaksi dengan aman dan nyaman.
        </div>
        <div style="margin-bottom:20px;">Cara Kerja FlexStore.com</div>
        <div style="margin-bottom:20px;">
          FlexStore.com Bekerja dengan cara menyediakan tempat dan sistem yang aman bagi Seller dan Buyyer.
          Seller akan mendapatkan ID transaksi setelah membuat room transaksi. ID ini dapat diberikan kepada Buyyer
          agar dapat segera menyelesaikan pembayaran.
        </div>
        <div style=margin-bottom:20px;>
          Metode Pembayaran FlexStore.com
        </div>
        <div>
          FlexStore.com menyediakan metode pembayaran melalu DANA, OVO Dan QRIS.
        </div>
			`
		})
	},
  loading(callback,time=1000){
    return makeElement('div',{
      style:`
        width:100%;
        height:100%;
        position:absolute;
        top:0;left:0;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        background:var(--tblack);
        z-index:1;
        flex-direction:column;
      `,
      innerHTML:`
        <div style="
          width:24px;
          height:auto;
          margin-top:10%;
          margin-bottom:10px;
        ">
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/yellowloading.gif style="
            width:100%;
            height:100%;
            object-fit:contain;
            border-radius:50%;
          ">
        </div>
        <div style="
          color:var(--yellow);
        ">Please Wait...</div>
      `,
      onadded(){
        if(time){
          setTimeout(()=>{
            if(callback){
              callback(this);
            }
            console.log(time);
            this.remove();
          },time);  
        }else{
          if(callback){
            callback(this);
          }
        }
      }
    })
  },
  noData(){
    return makeElement('div',{
      style:`color:gray;
        height:300px;
        display:flex;
      `,
      innerHTML:`
        <div>
          No data to display yet!
        </div>
      `
    })
  },
  oops(param,time=3000){
    return makeElement('div',{
      style:`
        width:100%;
        height:100%;
        position:absolute;
        top:0;left:0;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        background:var(--tblack);
        z-index:1;
        flex-direction:column;
      `,
      innerHTML:`
        <div style="
          height:auto;
          margin-top:10%;
          margin-bottom:10px;font-size:24px;
          color:gray;
          padding:10px;
          border-radius:10px;
          display:flex;
          flex-direction:column;
          gap:10px;
          justify-content:center;
          align-items:center;
        " class=width50>
          <div>Opps!</div>
          <div style=font-size:14px>${param}</div>
          <div style=font-size:10px>Click any where to close</div>
        </div>
        
      `,
      onclick(){
        this.remove();
      }
    })
  },
  showNewTrxId(param,tipe){
    const title = (tipe==='1')?'Data anda berhasil disubmit!':'Room berhasil dibuat!';
    const ket = (tipe==='1')?`Data anda akan kami review dan segera dipublish apabila memenuhi syarat dan ketentuan kami.`:'Rekber Room berhasil di buat, salin ID Transaksi dan bagikan kepada calon buyyer anda!';
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        align-items: flex-start;
      `,
      innerHTML:`
        <div style="
          margin-bottom:20px
        ">${title}</div>
        <div style="
          margin-bottom:20px;
        ">${ket}</div>
        <div style="margin-bottom:20px;">Simpan ID transaksi anda!</div>
        <div style="margin-bottom:20px;
          display:flex;
          gap:10px;
        ">
          <input value="${param}">
          <div style="
            align-items: flex-start;
            display: flex;
            flex-direction:initial;
          " id=submitbutton>
            <div class="button fullsmall" id=copytrxid><span style=margin-top:5px;>COPY</span></div>
        </div>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          display: flex;
          flex-direction:initial;
        " id=submitbutton>
          <div class="button fullsmall" id=submitnewdata><span style=margin-top:5px;>Submit data baru</span></div>
        </div>
      `,
      onadded(){
        this.find('#copytrxid').onclick = ()=>{
          navigator.clipboard.writeText(param).then(()=>{
            flexstore.sendCopiedMessage(param);
          })
        }
        this.find('#submitnewdata').onclick = ()=>{
          flexstore.openNewServices();
        }
      }
    })
  },
  copied(param){
    return makeElement('div',{
      style:`
        width:100%;
        height:100%;
        position:absolute;
        top:0;left:0;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        background:var(--tblack);
        z-index:1;
        flex-direction:column;
      `,
      innerHTML:`
        <div style="
          height:auto;
          margin-top:10%;
          margin-bottom:10px;font-size:24px;
          color:gray;
          padding:10px;
          border-radius:10px;
          display:flex;
          flex-direction:column;
          gap:10px;
          justify-content:center;
          align-items:center;
        " class=width50>
          <div>Copied!</div>
          <div style=font-size:14px>Your trx id is ${param}</div>
          <div style=font-size:10px>Click any where to close</div>
        </div>
      `,
      onclick(){
        this.remove();
      }
    })
  },
  dataDetailsRequest(param){
    console.log(param);
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="
          width:100%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          gap: 20px;
          border-radius: 10px;
          margin-bottom:30px; 
          scrollbar-width:thin;
          display:flex;
        " id=thumbnail>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
        ">
          ${data.title}
        </div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          ">
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/buy.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Beli</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=askowner>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Tanya Owner</span></div>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails()
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.askownerbutton = this.find('#askowner');
      },
      eventSet(){
        this.askownerbutton.onclick = ()=>{this.askOwner()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                this.doFull();
              }else{
                this.unFull();
              }
            }
          }))
        })
      },
      askOwner(){
        flexstore.openChat();
      }
    })
  },
  openDataMarketBuyyer(data,loading){
    //data market, buyyer.
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="
          width:100%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          gap: 20px;
          border-radius: 10px;
          margin-bottom:30px; 
          scrollbar-width:thin;
          display:flex;
        " id=thumbnail>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
        ">
          ${data.title}
        </div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          ">
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/buy.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Beli</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=askowner>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Tanya Owner</span></div>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails()
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.askownerbutton = this.find('#askowner');
      },
      eventSet(){
        this.askownerbutton.onclick = ()=>{this.askOwner()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                this.doFull();
              }else{
                this.unFull();
              }
            }
          }))
        })
      },
      askOwner(){
        flexstore.openChat();
      }
    })
  },
  openDataMarketSeller(data,loading){
    //define status string.
    const statuss = {
      '0status':'Pending',
      '-1status':'Rejected',
      '1status':'Approved'
    }
    //data market, seller.
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
          margin-bottom:30px;
        ">
          <div style="
            background:red;
            color:white;
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=deletebutton>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/deleteicon.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Hapus Data</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=editdata>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/editicon.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Edit Data</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=openproductinboxbutton>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Open Inbox</span></div>
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Preview / Thumbnail</div>
        <div style="
          width: 96%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          border-radius: 10px;
          margin-bottom: 30px;
          scrollbar-width: thin;
          display: flex;
          scrollbar-color:
          gray var(--gray);
          padding: 2%;
          background: var(--black);
          justify-content: flex-start;
        " id=thumbnail>
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Nama Produk</div>
        <div style="
          width:96%;
          align-items: flex-start;
          margin-bottom: 20px;display:flex;
          background:var(--black);
          padding:2%;
          border-radius: 10px;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>${data.title}</span></div>
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Deskripsi</div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Harga</div>
        <div style="
          width:96%;
          align-items: flex-start;
          margin-bottom: 20px;display:flex;
          background:var(--black);
          padding:2%;
          border-radius: 10px;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Status</div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
          justify-content:space-between;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
            background:var(--black);
          "><span style=margin-top:5px;>${statuss[`${data.status}status`]}</span></div>
          <div class=button ${(data.status!==-1)?'style=display:none;':''}><span style=margin-top:5px;>Kirim Revisi</span></div>
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Admin Note</div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.adminNotes||'-'}
        </div>
        <div style=margin-bottom:10px;margin-top:20px;>Status Order</div>
        <div style="width: 100%;
          width:96%;
          align-items: flex-start;
          margin-bottom: 20px;display:flex;
          background:var(--black);
          padding:2%;
          border-radius: 10px;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>${data.orderStatus?'Menunggu Pembayaran':'Tidak Sedang Diorder'}</span></div>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails();
        loading.remove();
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.editdatabutton = this.find('#editdata');
        this.deletebutton = this.find('#deletebutton');
        this.openProductInboxButton = this.find('#openproductinboxbutton');
      },
      eventSet(){
        this.editdatabutton.onclick = ()=>{this.edit()}
        this.deletebutton.onclick = ()=>{this.deleteData()}
        this.openProductInboxButton.onclick = ()=>{this.openProductInbox()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                flexstore.setRootOverflow('hidden');
                flexstore.root.scrollTo(0,0);
                this.doFull();
              }else{
                flexstore.setRootOverflow('auto');
                flexstore.root.scrollTo(0,0);
                this.unFull();
              }
            }
          }))
        })
      },
      edit(){
        flexstore.openSellerEdit(data);
      },
      openProductInbox(){
        flexstore.openProductInbox(data.signature,true);
      },
      deleteData(){
        const promptPermission = prompt('Anda yakin ingin menghapus data?(Ya/Tidak)','Tidak');
        if(!promptPermission || promptPermission==='Tidak')return;
        flexstore.body.addChild(view.loading(async (loading)=>{
          await flexstore.doglas.do(['database','products',data.signature,'remove','']);
          flexstore.openExplore();
          loading.remove();
        }),false);
      }
    })
  },
  openRekberBuyyer(data,loading){
    //rekber, buyyer.
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="
          width:100%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          gap: 20px;
          border-radius: 10px;
          margin-bottom:30px; 
          scrollbar-width:thin;
          display:flex;
        " id=thumbnail>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
        ">
          ${data.title}
        </div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          ">
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/buy.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Beli</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=askowner>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Tanya Owner</span></div>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails()
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.askownerbutton = this.find('#askowner');
      },
      eventSet(){
        this.askownerbutton.onclick = ()=>{this.askOwner()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                this.doFull();
              }else{
                this.unFull();
              }
            }
          }))
        })
      },
      askOwner(){
        flexstore.openChat();
      }
    })
  },
  openRekberSeller(data,loading){
    //rekber, seller.
    return makeElement('div',{
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="
          width:100%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          gap: 20px;
          border-radius: 10px;
          margin-bottom:30px; 
          scrollbar-width:thin;
          display:flex;
        " id=thumbnail>
        </div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
        ">
          ${data.title}
        </div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
        ">
          ${data.description}
        </div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
        ">
          <div style="
            padding:10px;
            border-radius: 10px;
          "><span style=margin-top:5px;>Rp. ${getPrice(data.price)}</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap: 2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          ">
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/buy.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Beli</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=askowner>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/askowner.png style="
            width:16px;height:16px;
          "><span style=margin-top:5px;>Tanya Owner</span></div>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails()
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.askownerbutton = this.find('#askowner');
      },
      eventSet(){
        this.askownerbutton.onclick = ()=>{this.askOwner()}
      },
      loadThumbnails(){
        data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            innerHTML:`
              <img src=${item}>
            `,
            state:0,
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            },
            onclick(){
              if(this.state===0){
                this.doFull();
              }else{
                this.unFull();
              }
            }
          }))
        })
      },
      askOwner(){
        flexstore.openChat();
      }
    })
  },
  dataMarketSellerEdit(data){
    //data market, seller.
    return makeElement('div',{
      data,
      style:`
        background:var(--gray);
        border-radius:10px;
        width:90%;
        color:gray;
        padding:5%;
        display:flex;
        align-items: flex-start;flex-direction:column;
      `,
      innerHTML:`
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
          margin-bottom:30px;
        ">
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between;
          " id=savebutton>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/saveicon.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Save Update</span></div>
          <div style="
            background:var(--yellow);
            color:var(--black);
            padding:10px;
            border-radius: 10px;
            cursor:pointer;
            flex-direction: initial;
            gap:2px;
            display:flex;
            align-items:center;
            justify-content:space-between
          " id=cancelbutton>
          <img src=${flexstore.isAdmin?'..':'.'}/more/media/cancelicon.png style="
            width:24px;height:24px;
          "><span style=margin-top:5px;>Kembali</span></div>
        </div>
        <div style=margin-bottom:10px;width:100%;display:flex;justify-content:space-between;align-items:center;>
          <div>Thumbnail</div>
          <div id=addthumbnailbutton style="cursor:pointer;">
            <img src=${flexstore.isAdmin?'..':'.'}/more/media/add.png>
          </div>
        </div>
        <div style="
          width: 96%;
          display: flex;
          flex-direction: initial;
          overflow: auto;
          border-radius: 10px;
          margin-bottom: 30px;
          scrollbar-width: thin;
          display: flex;
          scrollbar-color:
          gray var(--gray);
          padding: 2%;
          background: var(--black);
          justify-content: flex-start;
        " id=thumbnail>
        </div>
        <div style=margin-bottom:10px;>Nama Produk</div>
        <div style="
          width:100%;
          align-items: flex-start;
          font-size:24px;
          margin-bottom: 20px;
          display:flex;
        ">
          <input value="${data.title}" id=title>
        </div>
        <div style=margin-bottom:10px;>Deskripsi</div>
        <div style="
          background: var(--black);
          width:90%;
          border-radius: 10px;
          padding:5%;
          align-items: flex-start;
          margin-bottom:20px;
          display:flex;
        ">
          <textarea id=description>${data.description}</textarea>
        </div>
        <div style=margin-bottom:10px;>Harga</div>
        <div style="width: 100%;
          align-items: flex-start;
          flex-direction: initial;
          gap:20px;display:flex;
        ">
          <input value="${data.price}" id=price type=number>
        </div>
      `,
      onadded(){
        this.declare();
        this.eventSet();
        this.loadThumbnails();
        console.log(this.data);
      },
      declare(){
        this.thumbnail = this.find('#thumbnail');
        this.saveabutton = this.find('#savebutton');
        this.cancelbutton = this.find('#cancelbutton');
        this.description = this.find('textarea');
        this.addthumbnailbutton = this.find('#addthumbnailbutton');
        this.filepicker = makeElement('input',{
          accept:'image/*',type:'file',
          multiple:true,parent:this,
          onchange(){
            this.parent.updateThumbnail();
          }
        });
      },
      updateThumbnail(){
        const files = objToArray(this.filepicker.files);
        console.log(files);
        this.needToUploadThumbnail = files;
        const displayUrls = [];
        //get displayable url.
        let i=0;
        const fs = new FileReader();
        const getUrl = ()=>{
          fs.onload = ()=>{
            displayUrls.push(fs.result);
            i++;
            if(i<this.needToUploadThumbnail.length){
              return getUrl();
            }
            displayThumbnail();
          }
          fs.readAsDataURL(this.needToUploadThumbnail[i]);
        }
        const displayThumbnail = ()=>{
          displayUrls.forEach(item=>{
            this.thumbnail.addChild(makeElement('div',{
              style:`
                position:relative;
              `,src:item,
              innerHTML:`
                <img src=${item}>
                <div style="
                  padding:10px;
                  background:var(--black);
                  border-radius:10px;
                  position:absolute;
                  left:0;
                  top:0;
                  background:red;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  margin:10px 0 0 10px;
                " id=deletethisimgbutton>
                  <img src=${flexstore.isAdmin?'..':'.'}/more/media/deleteicon.png style="
                    width:16px;
                    height:16px;
                  ">
                </div>
              `,
              state:0,
              onadded(){
                this.find('img').onclick = ()=>{
                  if(this.state===0){
                    this.style.position = '';
                    flexstore.setRootOverflow('hidden');
                    flexstore.root.scrollTo(0,0);
                    this.doFull();
                  }else{
                    this.style.position = 'relative';
                    flexstore.setRootOverflow('auto');
                    flexstore.root.scrollTo(0,0);
                    this.unFull();
                  }
                }

                //delete button event.
                this.find('#deletethisimgbutton').onclick = ()=>{
                  if(this.parent.parentElement.data.thumbnail.includes(this.src)){
                    this.parent.parentElement.data.thumbnail = this.parent.parentElement.data.thumbnail.filter((src)=>{
                      if(src!==this.src)return src;
                    })
                  }else if(this.parent.parentElement.needToUploadThumbnail.includes(this.src)){
                    this.parent.parentElement.needToUploadThumbnail = this.parent.parentElement.needToUploadThumbnail.filter((src)=>{
                      if(src!==this.src)return src;
                    })
                  }
                  this.remove();
                }
              },
              doFull(){
                this.classList.add('fullsc');
                this.state = 1;
              },
              unFull(){
                this.classList.remove('fullsc');
                this.state = 0;
              }
            }))
          })
        }
        getUrl();
      },
      eventSet(){
        this.saveabutton.onclick = ()=>{this.save()}
        this.cancelbutton.onclick = ()=>{this.cancell()}
        this.findall('input').forEach(input=>{
          input.onchange = ()=>{
            this.data[input.id] = input.value;
          }
        })
        this.description.onchange = ()=>{
          this.data.description = this.description.value;
        }
        this.addthumbnailbutton.onclick = ()=>{
          this.filepicker.click();
        }
      },
      loadThumbnails(){
        this.data.thumbnail.forEach(item=>{
          this.thumbnail.addChild(makeElement('div',{
            style:`
              position:relative;
            `,src:item,
            innerHTML:`
              <img src=${item}>
              <div style="
                padding:10px;
                background:var(--black);
                border-radius:10px;
                position:absolute;
                left:0;
                top:0;
                background:red;
                display:flex;
                align-items:center;
                justify-content:center;
                margin:10px 0 0 10px;
              " id=deletethisimgbutton>
                <img src=${flexstore.isAdmin?'..':'.'}/more/media/deleteicon.png style="
                  width:16px;
                  height:16px;
                ">
              </div>
            `,
            state:0,
            onadded(){
              this.find('img').onclick = ()=>{
                if(this.state===0){
                  this.style.position = '';
                  flexstore.setRootOverflow('hidden');
                  flexstore.root.scrollTo(0,0);
                  this.doFull();
                }else{
                  this.style.position = 'relative';
                  flexstore.setRootOverflow('auto');
                  flexstore.root.scrollTo(0,0);
                  this.unFull();
                }
              }
              //delete event
              this.find('#deletethisimgbutton').onclick = ()=>{
                console.log(this.parent.parentElement.data.thumbnail);
                console.log(this.parent.parentElement.needToUploadThumbnail);
                if(this.parent.parentElement.data.thumbnail.includes(this.src)){
                  this.parent.parentElement.data.thumbnail = this.parent.parentElement.data.thumbnail.filter((src)=>{
                    if(src!==this.src)return src;
                  })
                  console.log(this.parent.parentElement.data.thumbnail,'old data thumbnail');
                }else if(this.parent.parentElement.needToUploadThumbnail.includes(this.src)){
                  this.parent.parentElement.needToUploadThumbnail = this.parent.parentElement.needToUploadThumbnail.filter((src)=>{
                    if(src!==this.src)return src;
                  })
                  console.log(this.parent.parentElement.needToUploadThumbnail,'new data thumbnail');
                }
                this.remove();
              }
            },
            doFull(){
              this.classList.add('fullsc');
              this.state = 1;
            },
            unFull(){
              this.classList.remove('fullsc');
              this.state = 0;
            }
          }))
        })
      },
      async cancell(loadingout){
        let requestedData;
        if(!loadingout){
          flexstore.body.addChild(view.loading(async (loading)=>{
            requestedData = flexstore.normalizeData((await flexstore.doglas.do(['database','products',this.data.signature,'get'])).val()||{});
            flexstore.showDataDetails(requestedData,loading);
          },false))  
        }else{
          requestedData = flexstore.normalizeData((await flexstore.doglas.do(['database','products',this.data.signature,'get'])).val()||{});
          flexstore.showDataDetails(requestedData,loadingout);
        }
      },
      async updateThumbnailFirst(){
        return new Promise((resolve,reject)=>{
          i = 0;
          const upThumbnail = async ()=>{
            const uploadedfile = await flexstore.doglas.save([this.needToUploadThumbnail[i].name,this.needToUploadThumbnail[i],this.needToUploadThumbnail[i].type]);
            this.data.thumbnail.push(await uploadedfile.ref.getDownloadURL());
            i += 1;
            if(i<this.needToUploadThumbnail.length){
              return upThumbnail();
            }
            resolve();
          }
          upThumbnail();  
        })
      },
      save(){
        flexstore.body.addChild(view.loading(async (loading)=>{
          //handling new thumbnail first.
          if(this.needToUploadThumbnail){
            await this.updateThumbnailFirst();
          }
          await flexstore.doglas.do(['database','products',this.data.signature,'update',this.data]);
          this.cancell(loading);
        }),false);
      }
    })
  },
  changeProductStatus(param,param2,param3){
    return makeElement('div',{
      style:`
        width: 100%;
        height: 100%;
        background:var(--tblack);
        position: absolute;
        left: 0;top: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        z-index:1;
      `,
      innerHTML:`
      <div class=statuschanger>
        <div style="
          background: var(--brown);
          border-bottom: 1px solid var(--black);
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding:20px;
          color:gray;
        ">
          <div>Ubah Status Produk</div>
          <div style="
            width:24px;
            height:24px;
            cursor:pointer;
          " id=closethis>
            <img src=${flexstore.isAdmin?'..':'.'}/more/media/grayclose.png style="
              width:100%;
              height:100%;
            ">
          </div>
        </div>
        <div style="
          height: 100%;
          padding:20px;
          overflow: auto;
          scrollbar-width:thin;
          color:gray;
        ">
          <div style=margin-bottom:10px;>
            <div style=margin-bottom:10px;>Status</div>
            <div>
              <select value=${param2}>
                <option value=1 ${param2===1?'selected':''}>Approved</option>
                <option value=0 ${param2===0?'selected':''}>Pending</option>
                <option value=-1 ${param2===-1?'selected':''}>Canceled</option>
              </select>
            </div>
          </div>
          <div style=margin-bottom:20px;>
            <div style=margin-bottom:10px;>Catatan</div>
            <div style=display:flex;>
              <textarea placeholder="Tuliskan alasan perubahan status" style="height:100px;">${param3}</textarea>
            </div>
          </div>
          <div class=button id=savechanges>Simpan Perubahan</div>
        </div>
      </div>
      `,
      onadded(){
        this.find('#closethis').onclick = ()=>{this.remove()}
        this.find('#savechanges').onclick = ()=>{
          this.processChanges();
        }
        this.notes = this.find('textarea');
        this.status = this.find('select');
      },
      collectData(){
        return {
          status:Number(this.status.value),
          adminNotes:this.notes.value
        }
      },
      processChanges(){
        const data = this.collectData();
        
        //save the new change.
        flexstore.body.addChild(view.loading(async (loading)=>{
          await flexstore.doglas.do(['database','products',param,'update',data]);
          this.remove();
          loading.remove();
          flexstore.openExplore();
        },false))
      }
   })
  },
  confirmOrder(param,param2){
    console.log(param,param2);
    return makeElement('div',{
      style:`
        width: 100%;
        height: 100%;
        background:var(--tblack);
        position: absolute;
        left: 0;top: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        z-index:1;
      `,
      innerHTML:`
      <div class=statuschanger>
        <div style="
          background: var(--brown);
          border-bottom: 1px solid var(--black);
          border-radius: 10px 10px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding:20px;
          color:gray;
        ">
          <div id=windowtitle>Konfirmasi Order</div>
          <div style="
            width:24px;
            height:24px;
            cursor:pointer;
          " id=closethis>
            <img src=${flexstore.isAdmin?'..':'.'}/more/media/grayclose.png style="
              width:100%;
              height:100%;
            ">
          </div>
        </div>
        <div style="
          height: 100%;
          padding:20px;
          overflow: auto;
          scrollbar-width:thin;
          color:gray;
        ">
          <div id=rootthis>
            <div style=margin-bottom:10px;>
              Informasi Produk
            </div>
            <div style="
              margin-bottom: 20px;
              padding: 10px;
              height: 200px;
              overflow: auto;
              overflow-x: auto;
              border-radius: 5px;
              scrollbar-width: thin;
              scrollbar-color:
              gray var(--gray);
              background: var(--brown);
              overflow-x: hidden;
            ">
              <div>
                <div style=margin-bottom:20px;>
                  <div style=margin-bottom:10px;>Nama Produk</div>
                  <div style=display:flex;>
                    <input readonly value="${param.title}">
                  </div>
                </div>
                <div style=margin-bottom:20px;>
                  <div style=margin-bottom:10px;>Seller</div>
                  <div style=display:flex;>
                    <input readonly value="${param.sumbitname}">
                  </div>
                </div>
                <div style=margin-bottom:20px;>
                  <div style=margin-bottom:10px;>Harga</div>
                  <div style=display:flex;>
                    <input readonly value="Rp ${getPrice(param.price)}">
                  </div>
                </div>
                <div style=margin-bottom:20px;>
                  <div style=margin-bottom:10px;>Deskripsi</div>
                  <div style=display:flex;>
                    <textarea readonly style=height:100px;>${param.description}</textarea>
                  </div>
                </div>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Password Buyyer (Optional)</div>
              <div style=display:flex;>
                <input type=password placeholder="Masukan Password Buyyer Anda" id=password>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Metode Pembayaran</div>
              <div style=display:flex;>
                <select>
                  <option value=0 selected>Manual</option>
                  <option value=1>Qris</option>
                </select>
              </div>
            </div>
          </div>
          <div class=button id=processorder>Proses Pesanan</div>
        </div>
      </div>
      `,
      onadded(){
        this.find('#closethis').onclick = ()=>{this.remove()}
        
        this.password = this.find('#password');
        this.pm = this.find('select');
        this.windowTitle = this.find('#windowtitle');
        this.processOrderButton = this.find('#processorder');
        this.root = this.find('#rootthis');
        this.processOrderButton.onclick = ()=>{
          if(this.closeState)
            return this.remove();
          this.processOrder();
        }
        if(param2){
          this.handleOrderCallback(param);
        }
      },sistemPass:`Bp/${getUniqueID(16)}`,
      collectData(){
        return {
          sig:param.signature,
          bp:this.password.value.length>0?this.password.value:this.sistemPass,
          pm:this.pm.value
        }
      },
      processOrder(){
        const data = this.collectData();
        
        //save the new change.
        flexstore.body.addChild(view.loading(async (loading)=>{
          const result = await flexstore.requestOrder(data);
          this.handleOrderCallback(result.getJSONResponse());
          loading.remove();
        },false))
      },
      updateDbFirst(param){
        const orderId = flexstore.getOrderId(param);
        return new Promise(async (resolve,reject)=>{
          //set product status order.
          await flexstore.doglas.do(['database','products/',`${param.pSignature}/orderStatus`,'set',1]);
          //set new order data.
          await flexstore.doglas.do(['database',`products/${param.pSignature}/orderList/OId/`,`${orderId}`,'set',param]);
          resolve();
        });
      },
      async handleOrderCallback(param){
        console.log(param);
        this.closeState = true;
        this.windowTitle.innerHTML = 'Informasi Pembayaran';
        this.processOrderButton.remove();
        await this.updateDbFirst(param);
        this.showPaymentInfo(param);
      },
      showPaymentInfo(param){
        if(!param.paymentCode)
          param.paymentCode = 'Example';
        this.root.replaceChild(makeElement('div',{
          style:`
            height:${innerHeight*.5}px;
            overflow:auto;
            scrollbar-width:thin;
            scrollbar-color:var(--gray) var(--gray);
            padding:10px;
          `,
          innerHTML:`
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Order ID</div>
              <div style=display:flex;>
                <input id=password value="${param.pSignature}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Password Buyyer</div>
              <div style=display:flex;>
                <input id=password value="${param.buyyerPass}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Metode Pembayaran <span style="
                font-size:9px;color:var(--yellow);
              ">Klik kotak hitam untuk memperbesar qr</span></div>
              <div style="
                display: flex;
                padding: 20%;
                justify-content: center;
                background: var(--black);
                border-radius: 10px;
                cursor:pointer;
              " id=paymentmethod>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${param.paymentCode}" ${param.qr?'hidden':''} style="
                " id=qrimg>
                <input id=password value="${param.paymentCode}" readonly ${!param.qr?'hidden':''}>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Produk</div>
              <div style=display:flex;>
                <input id=password value="${param.product}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Harga</div>
              <div style=display:flex;>
                <input id=password value="Rp ${getPrice(param.price)}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Waktu Pemesanan</div>
              <div style=display:flex;>
                <input id=password value="${param.orderTime}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Status</div>
              <div style=display:flex;>
                <input id=password value="${param.statusPayment||'Menunggu Pembayaran'}" readonly>
              </div>
            </div>
            <div style=margin-bottom:20px;>
              <div style=margin-bottom:10px;>Lihat Data <span style="
                font-size:9px;color:var(--yellow);
              ">Anda akan dapat melihat data setelah melakukan pembayaran</span></div>
              <div style=display:flex;>
                <div class="button ${param.statusPayment|| 'inactive'}" style=width:100%;>Lihat Data</div>
              </div>
            </div>
          `,
          onadded(){
            this.declare();
            this.fullqr();
          },
          declare(){
            this.qrImg = this.find('#qrimg');
            this.paymentmethod = this.find('#paymentmethod');
          },
          fullqr(){
            this.qrImg.onclick = ()=>{
              this.clickFull();
              console.log('openingshit');
            }
            this.paymentmethod.onclick = ()=>{
              this.clickFull();
            }
          },
          clickFull(){
            if(this.state===0){
              flexstore.setRootOverflow('hidden');
              flexstore.root.scrollTo(0,0);
              this.doFull();
            }else{
              flexstore.setRootOverflow('auto');
              flexstore.root.scrollTo(0,0);
              this.unFull();
            }
          },
          state:0,
          doFull(){
            this.paymentmethod.classList.add('fullsc');
            this.paymentmethod.style.padding = '0';
            this.state = 1;
          },
          unFull(){
            this.paymentmethod.classList.remove('fullsc');
            this.state = 0;
            this.paymentmethod.style.padding = '20%';
          }
        }))
      }
   })
  }
}

flexstore.init();