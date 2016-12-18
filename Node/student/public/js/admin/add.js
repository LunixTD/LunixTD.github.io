$('#dataForm').validate({
  rules:{
    name:{
      required:true,
      minlength:2
    },
    email:{
      email:true,
      required:true,
    },
    birthday:{
      required:true,
      dateISO:true
    },
    mobile:{
      isMobile:true,
      required:true
    },
    address:{
      required:true,
    }
  },
  submitHandler:function(ele){
    $.ajax({
      method:'post',
      url:$(ele).attr('action'),
      data:$(ele).serialize(),
      success:function(res){
          console.dir(res)
          if(res.status == 'y'){
            window.location.href = '/admin/student/list';
          }
      }
    })
  }
})

