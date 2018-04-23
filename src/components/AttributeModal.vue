<template>
	<ModifyPassword>
	<div class="foot">
            <input type="button" name="OK" value="提交" class="yes" >
            //在取消按钮这里调用点击事件
            <input type="button" name="cancel" value="取消" class="no" @click="Hidden()">
          </div>
	</ModifyPassword>
</template>

<script>

export default {
    data(){
      return{}
    },
    methods:{
      //本更改密码弹出框的显示隐藏事件
      Hidden(){
        //通过$emit引用组件传过来的hidden()事件
        this.$emit('hidden')
      }
    }
  }

</script>
