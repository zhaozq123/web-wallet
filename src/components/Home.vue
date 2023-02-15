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
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件监听器绑定
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
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
    <el-button type="primary" @click="dialogFormVisible=true">Send</el-button>
    <div class="flex-1 flex-row justify-center"><h1 class="green">XXX.xxx BCH</h1></div>

    <div class="font22 flex-row flex-1 justify-end items-center">
      <span>CashAddr：</span>
      <span>{{cashAddr}}</span>
      <div class="ml-20 font22">
        <i class="iconfont icon-copy  iconFont" @click="()=>{copyText(cashAddr)}"></i>
        <i class="iconfont icon-erweima ml-10 iconFont" @click="()=>{QRmodalHander(cashAddr)}"></i>
      </div>
     
    </div>

    <div class="font22 mt-20 flex-row flex-1 justify-end items-center"> 
      <span>Legacy：</span>
      <span>{{legacy}}</span>
      <div class="ml-20 font22">
        <i class="iconfont icon-copy  iconFont"  @click="()=>{copyText(legacy)}"></i>
        <i class="iconfont icon-erweima ml-10  iconFont" @click="()=>{QRmodalHander(legacy)}"></i>
      </div>
     
    </div>



  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" :width="_isMobile()?'90%':'35%'"  title="Send confirmation">
    <el-form :model="form" class="p-20">
      <el-form-item label="Reciever" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Amount" :label-width="formLabelWidth">
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- modal -->
  <el-dialog v-model="QRmodal"  :width="_isMobile()?'90%':'35%'" class="model-w" title="Send confirmation" >
    <el-form :model="form">
     <img  :src="QRUrl"  class="w-100" height="300"/>
    </el-form>
  </el-dialog>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
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

.p-20{
 padding:0px 50px 0px 0px;
}

.greetings{
  padding:30px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}


@media (max-width: 750px) {
  .model-w{
    width: 90%;
  }
}

@media (min-width: 750px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  .model-w{
    width: 35%;
  }
}
</style>
