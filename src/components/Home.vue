<script lang="ts">import { ElMessage } from 'element-plus';

export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      msg:0,
      count: 0,
      cashAddr:"0xb41981438e18A686E571f5f5f38eA6b357d83dfe",
      legacy:"0xb41981438e18A686E571f5f5f38eA6b357d83dfe",
      dialogFormVisible:false,
      formLabelWidth:'140px',
      form:{
        name: '',
        region: ''
      },
      QRmodal:false,
      QRUrl:"",
      isMoblie:false
    }
  },

    created(){
      this._isMobile();
      window.addEventListener('resize', this._isMobile)
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this._isMobile)
    },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件监听器绑定
  methods: {
    _isMobile(event?:any) {
      var clientWidth = document.documentElement.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
         this.isMoblie=false
      } else {
         this.isMoblie=true
      }
    },
    increment() {
      this.count++
    },
    copyText(text:string){
      let inputDom = document.createElement('input');  
      inputDom.setAttribute('readonly', 'readonly'); 
      inputDom.value = text;
      document.body.appendChild(inputDom); 
      inputDom.select(); 
      document.execCommand('Copy'); 
      inputDom.style.display = 'none';
      inputDom.remove(); 
      this.openElMessage();
    },
    openElMessage(){
       ElMessage({
          message: 'Copy successfully',
          type: 'success',
       })
    },
    QRmodalHander(address?:string){
     this.QRmodal=true;
     this.QRUrl='src/assets/QR.png';
    },
    sendHander(){
      this.dialogFormVisible = false
     // TO DO: send Hander
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <div class="flex-col flex-1 greetings">
    <div class="flex-row flex-1 justify-center"><el-button class="btn-w"  type="success" round @click="dialogFormVisible=true">Send</el-button></div>
    <div class="mt-20 flex-1 flex-row justify-center"><h1 class="green">XXX.xxx BCH</h1></div>

    <div :class="isMoblie?'flex-col':'flex-row'" class="font22 flex-row flex-1 justify-end ">
      <span class="bold">CashAddr：</span>
      <div class='flex-row'>
            <div class="flex-row items-center addrWidth font22">{{cashAddr}}</div>
            <div class="ml-20 font22">
              <i class="iconfont icon-copy  iconFont" @click="()=>{copyText(cashAddr)}"></i>
              <i class="iconfont icon-erweima ml-10 iconFont" @click="()=>{QRmodalHander(cashAddr)}"></i>
            </div>
      </div>
    </div>

    <div :class="isMoblie?'flex-col':'flex-row'"  class="font22 mt-20 flex-row flex-1 justify-end "> 
      <span class="bold">Legacy：</span>
      <div class='flex-row'>
        <div class=" flex-row items-center addrWidth font22">{{legacy}}</div>
        <div class="ml-20 font22">
          <i class="iconfont icon-copy  iconFont"  @click="()=>{copyText(legacy)}"></i>
          <i class="iconfont icon-erweima ml-10  iconFont" @click="()=>{QRmodalHander(legacy)}"></i>
        </div>
      </div>
    </div>



  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" :width="isMoblie?'90%':'50%'"  :title="isMoblie?'':'Send confirmation'">
    <el-form  :label-position="isMoblie?'top':''" :model="form" class="p-20">
      <el-form-item  :label="isMoblie?'':'Reciever'" :label-width="isMoblie?'':formLabelWidth">
        <span v-if="isMoblie" class="modalFont">Reciever</span>
        <el-input  class="inputHeight" v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="isMoblie?'':'Amount'" :label-width="isMoblie?'':formLabelWidth">
        <span v-if="isMoblie" class="modalFont">Amount</span>
        <el-input class="inputHeight" v-model="form.region" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button   class="btn-sure"  @click="dialogFormVisible = false">Cancel</el-button>
        <el-button  class="btn-sure"  type="primary" @click="sendHander">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- QRmodal -->
  <el-dialog v-model="QRmodal"  :width="isMoblie?'90%':'50%'" class="model-w" title="" >
    <el-form :model="form">
     <img  :src="QRUrl"  class="w-100" height="300"/>
    </el-form>
  </el-dialog>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  /* font-size: 2.6rem; */
  top: -10px;
}

h3 {
  /* font-size: 1.2rem; */
}
.bold{
  font-weight:bold
}
.mt-20{
 margin-top: 20px;
}
.iconFont{
  font-size: 22px;
  cursor: pointer;
}

.font22{
  font-size: 22px;
}
.mt-20{
  margin-top: 20px;
}
.ml-10{
  margin-left: 10px;
}
.ml-20{
  margin-left: 10px;
}

.btn-w{
  width: 175px;
  height: 35px;
  font-size: 22px;
  padding: 20px;
}



.greetings{
box-shadow: 0 0 5px 1px #9999999a;
}


.greetings h1,
.greetings h3 {
  text-align: center;
}


@media (max-width: 750px) {
  .model-w{
    width: 90%;
  }
  .addrWidth{
     width: 5rem;
     overflow: auto;
  } 
  .greetings{
    padding:20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
  }

  .modalFont{
    font-size: 22px !important;
  }

  .inputHeight{
    height: 50px !important; 
  }
  .btn-sure{
  width: 175px;
  height: 35px;
  font-size: 22px;
  padding: 25px 0px 25px 0px;
}
}

@media (min-width: 750px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  .greetings{
    padding:30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
  }
  .p-20{
    padding:0px 50px 0px 0px;
  }
}
</style>
