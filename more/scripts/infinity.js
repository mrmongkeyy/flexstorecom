Array.prototype.getRandom = function(){
	return this[Math.floor(Math.random()*this.length)];
}
Array.prototype.split = function(len){
	const newArray = [];

	let loop = this.length;
	//find a loop.
	if(loop%2!==0){
		loop+=1;
	}
	loop = loop/2;
	for(let i=0;i<loop;i++){
		newArray.push([]);
	}

	let i = 0;
	this.forEach((item)=>{
		if(newArray[i].length===2){
			i += 1;
		}
		newArray[i].push(item);
	})

	return newArray;
}
//Object.prototype.forEach = function(callback){
//	let i = 0;
//	for(let key in this){
//		callback(this[key],i);
//		i++;
//	}
//}
JSON.toEncoded = function(obj){
	let string = '';
	for(let i in obj){
		string += `${i}=${obj[i]}&&`;
	}
	return string;
}
const jsonstr = function(obj){
	return JSON.stringify(obj);
}
const filterString = function(string,char,newchar){
	while(string.indexOf(char)!=-1){
		string = string.replace(char,newchar);
	}
	return string;
}
const emptycheck = function(jsondata){
	let valid = true;
	for(let i in jsondata){
		if(!jsondata[i] || jsondata[i].length===0){
			valid = false;
			break;
		}
	}
	return valid;
}
const recheckvalue = function(el,time=1000){
	const borderColorBefore = el.style.borderColor;
	el.style.borderColor = 'red';
	setTimeout(()=>{el.style.borderColor = borderColorBefore},time);
}
const getTimestamp = function(){
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();
	while(time.indexOf('.')!=-1){
		time = time.replace('.','');
	}
	
	const metadate = date.split('/');
	date = '';
	metadate.reverse();
	metadate.forEach(d=>{
		if(d.length===1){
			d = 0+d;
		}
		date += d;
	})
	return(date+time);
}
const vector2 = function(x=0,y=0){
	return {x,y};
}
const forIn = function(n,f){
	for(let i=0;i<n;i++)if(f)f(i);
}
const getRad = function(n){return n*Math.PI/180}
const vector2Dir = function(v1,v2){
	return Math.atan2(v2.x-v1.x,v2.y-v1.y);
}
const transformV = function(v1,v2){
	return vector2(v2.x-v1.x,v2.y-v1.y);
}
const getMagnitude = function(vector){
	return Math.hypot(vector.x,vector.y);
}
const random = function(len,min=0){
	return Math.floor(Math.random()*len)+min;
}
const find = function(p){
	return Object.assign(document.querySelector(p),toInject);
}
const findall = function(p){
	const els = document.querySelectorAll(p);
	for(let i=0;i<els.length;i++){
		Object.assign(els[i],toInject);
	}
	return els;
}
const flex = {
	components:[]	
}

const objlen = function(obj){
	let i = 0;
	for(let x in obj){
		i += 1;
	}
	return i;
}

const toInject = {
		find(p){
			const el = this.querySelector(p);
			if(!el)return null;
			el.parent = this;
			return Object.assign(el,this);
		},
		findall(p){
			const els = this.querySelectorAll(p);
			for(let i=0;i<els.length;i++){
				els[i].parent = this;
				Object.assign(els[i],toInject);
			}
			return els;
		},
		addChild(child){
			child.parent = this;
			this.appendChild(child);
			flex.components.push(child);
			if(child.onadded)child.onadded();
			return child;
		},
		addBefore(child,oldChild){
			child.parent = this;
			this.insertBefore(child,oldChild);
			if(child.onadded)child.onadded();
		},
		show(setting='block'){
			if(this.style.display === 'none' || this.style.display === ''){
				this.style.display = setting; 
			}
		},
		hide(){
			if(this.style.display !== 'none' || this.style.display !== ''){
				this.style.display = 'none';
			}
		},
		replaceChild(child){
			this.clear();
			this.addChild(child);
		},
		changeTo(el,typeDisplay='block'){
			this.hide();
			el.style.display = typeDisplay;
		},
		saveRemove(p){
			const el =	this.querySelector(p);
			if(el)el.remove();
		},
		clear(){
			this.innerHTML = '';
		},
		update(someupdate){
			Object.assign(this,someupdate);
		},
		setHTML(string){
			this.innerHTML = string;
		},
		showUp(before,after,timeout=2000){
			before(this);
			setTimeout(()=>{
				after(this);
			},timeout)
		}
	}

const makeElement = function(name,optional={}){
	Object.assign(optional,toInject);
	return Object.assign(document.createElement(name),optional);
}
document.body.addChild = function(child){
	this.appendChild(child);
	if(child.onadded)child.onadded();
}

window.onresize = function(){
	flex.components.forEach(component=>{
		if(component.onScreenChange)component.onScreenChange(innerWidth,innerHeight);
	})
}

const form = function(data){
	const form = new FormData();
	for(let key in data){
		form.append(key,data[key]);
	}
	return form;
}

const cOn = {
	x:new XMLHttpRequest(),
	init(){
		this.x.someSettings = [];
		this.x.getJSONResponse = ()=>{
		  return JSON.parse(this.x.responseText);
		}
	},
	post(config){
		this.init();
		Object.assign(this.x,config);
		this.x.open('POST',config.url);
		if(this.x.someSettings.length>0){
			this.x.someSettings.forEach(x=>{
				this.x[x[0]](x[1],[x[2]]);
			});
		}
		this.x.send(config.data);
	},
	get(config){
		this.init();
		Object.assign(this.x,config);
		this.x.open('GET',config.url);
		this.x.send();
	}
}
const uploadFile = function(type='readAsArrayBuffer',file,transferRate=1000,progress,callback,dataoptional={}){
	const fs = new FileReader();
	fs.onload = function(){
		const data = this.result;
		let uploaded = 0;
		let uploadedf = false;
		const send = function(){
			let start = uploaded;
			let end = start+transferRate;
			if(end>data.byteLength){
				end = end-(end-data.byteLength);
				uploadedf = true;
			}
			let chunk = data.slice(start,end);
			cOn.post({
				url:'/upload',
				someSettings:[['setRequestHeader','content-type','application/octet-stream'],
					['setRequestHeader','filedata',JSON.stringify(Object.assign({
						fname:file.name
					},dataoptional))],
				],
				data:chunk,
				onload(response){
					uploaded += chunk.byteLength;
					progress(uploaded);
					if(uploadedf){
						callback(response);
					}else send();
				}
			})
		}
		send();
		
	}
	fs[type](file);
}
const readFile = function(src,readMode,callback){
	const fr = new FileReader();
	fr[readMode](src);
	fr.onloadend = function(){
		callback(this.result);
	}
}

const getPrice = function(value){
	value = String(value);
	let result = '';
	while(true){
		if(value.length>3){
			result = '.'+value.slice(value.length-3)+result;
			value = value.slice(0,value.length-3);
		}else{
			result = value+result;
			break
		}
	}
	return result;
}
const speedywords = function(words,el,speed=1000){
	//try to work on this.
	let wIndex = 0;
	let cIndex = 0;
	const display = ()=>{
		el.innerHTML += `<span>${words[wIndex][cIndex]}</span>`;
		cIndex++;
		if(cIndex===words[wIndex].length+1){
			wIndex++;
			if(wIndex===words.length){
				wIndex = 0;
			}
			cIndex = 0;
			el.clear();
		}
	}
	const interval = setInterval(()=>{
		display();
	},speed)
}
const showElement = function(el,displaymode='flex'){
	el.style.display = displaymode;
}
const hideElement = function(el){
	el.style.display = 'none';
}
const getTime = function(){
	return new Date().getTime();
}
const getUniqueID = function(len=10){
	const seed = 'aAbBcCdDEeFfJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
	let result = '';
	for(let i=0;i<len;i++){
		result += seed[Math.floor(Math.random()*seed.length)];
	}
	return result;
}
const objToArray = function(obj){
	const bucket = [];
	Object.keys(obj).forEach(key=>{
		bucket.push(obj[key]);
	})
	return bucket;
}
const OBJevaluate = function(obj){
  const newObj = {};
  for(let i in obj){
    if(obj[i]){
      newObj[i] = obj[i];
    }
  }
  return newObj;
}

const imgErrHandler = function(){
	console.log(this);
}

const is_null = function(arr){
	return arr.length === 0;
}
const openLoading = function(loadingmsg,added,imgSrc){
	return makeElement('div',{
		id:'loadingDiv',
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:RGB(255,255,255,.7);
			display:flex;
			align-items:center;
			justify-content:center;
			index:1;
		`,
		innerHTML:`
			<div
			style="
				background:white;
				padding:20px;
				display:flex;
				flex-direction:column;
				align-items:center;
				border-radius:20px;
				box-shadow:0 1px 5px rgba(0,0,0,.2),0 2px 2px rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12);
			"
			>
				<img src=${imgSrc||'/file?fn=loadingscreen.gif'}
				style="
					width:200px;
				"
				>
				<span>${loadingmsg}</span>
			</div>
		`,
		onadded(){
			if(added)added(this);
		}
	})
}
const compareSet = function(src,c1,c2){
	if(src===c1){
		src = c2;
	}else if(src===c2){
		src = c1;
	}
}
const forceRecheck = function(el,msg,inf=false){
	const allfrc = findall('#frcel');
	el.addChild(makeElement('div',{
		id:'frcel',
		style:`
			position:absolute;
			background:red;
			color:white;
			padding:15px;
			z-index:2;
			left:0;
			font-size:16px;
			margin-top: ${50*allfrc.length+1}px;
			bottom:0;
		`,
		innerHTML:msg,
		onadded(){
			if(!inf){
				setTimeout(()=>{
					this.remove()
				},2000);
			}
		}
	}))
}
const getTimePlus = function(number){
	return new Date().getTime()+number;
}
const nonull = function(obj){
	const nullkeys = [];
	for(let i in obj){
		if(!obj[i]){
			nullkeys.push(i);
		}
	}
	return {
		valid:nullkeys.length===0?true:false,
		nullkeys
	}
}
const getFullDate = function(){
	return new Date().toLocaleDateString();
}

const ddmmyy = function(){
	const date = new Date();
	let day = String(date.getUTCDate());
	day = day.length===1?`0${day}`:day;
	let month = String(date.getUTCMonth());
	month = month.length===1?`0${month}`:month;
	let year = String(date.getUTCFullYear());
	year = year.length===1?`0${year}`:year;
	return `${day}-${month}-${year}`;
}

const SmartTime = function(msInput){
	const now = new Date();
	const ms = now.getTime();
	const gap = ms-msInput;
	const stc = ['detik','menit','jam','hari','minggu','bulan','tahun'];
	//getting the secons first.
	const stringSecon = String(gap);
	let secons = Number(stringSecon.slice(0,(stringSecon.length-3)));
	//getting minutes.
	const seconModulo = secons%60;
	let minutes = (secons-(seconModulo))/60;
	secons=seconModulo;
	const minuteModulo = minutes%60;
	let hours = (minutes-(minuteModulo))/60;
	minutes = minuteModulo;
	const hoursModulo = hours%24;
	let day = (hours-hoursModulo)/24;
	hours = hoursModulo;
	const dayModulo = day%7;
	let week = (day-dayModulo)/7;
	day = dayModulo;
	const weekModulo = week%4;
	let month = (week-weekModulo)/4;
	week = weekModulo;
	const monthModulo = month%12;
	let year = (month-monthModulo)/12;
	month = monthModulo;
	const data = [secons,minutes,hours,day,week,month,year];
	let index = -1;
	for(let i=0;i<data.length;i++){
		if(data[i]){
			index = i;
		}
	}
	if(index == -1)return 'Baru saja';
	return `${data[index]} ${stc[index]} lalu`;
}
