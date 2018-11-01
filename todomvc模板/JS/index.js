new Vue({
	el: '.todoapp',
	data: {
		datas: [],
		text: '',
		editStatus : -1,
		oldText : ''
	},
	created :function (){
		this.datas = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
	},
	updated : function () {
		localStorage.setItem('items',JSON.stringify(this.datas))
	},
	methods: {
		// 增加
		add: function () {
			if(!this.text)return;
			this.datas.push({
				text: this.text,
				complete: false
			});
			this.text = ''
		},
		// 删除
		del: function (index) {
			this.datas.splice(index, 1)
		},
		// 先进性检测全选还是全不选
		// 有任何一个没被选中 则执行全选
		// 所有的都被选中 则执行全不选
		checkStatus: function (flag) {
			for (var i = 0; i < this.datas.length; i++) {
				if (flag ? this.datas[i].complete : !this.datas[i].complete) {
					return true;
				}

			}
			return false;
		},
		// 全选
		toggleAll: function () {
			var flag = this.checkStatus();
			for (var i = 0; i < this.datas.length; i++) {
				this.datas[i].complete = flag;
			}
		},
		// 删除已完成
		delAll: function () {
			var arr = [];
			for(var i = 0 ; i < this.datas.length ; i++){
				if(this.datas[i].complete === false){
					arr.push(this.datas[i]);
				}
			}
			this.datas = arr ;
		},
		// 双击编辑
		edit:function (index) {
			this.editStatus = index ;
			this.oldText = this.datas[index].text ;
		},
		// 保存text
		saveText :function (index) {
			this.editStatus = -1 ;
			if(this.oldText !==this.datas[index].text){
				this.datas[index].complete = false ;
			}
		}
	}

});
