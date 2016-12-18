$('#dataForm').validate({
    rules: {
        userName: {
            required: true,
            minlength: 2
        },
        userPWD: {
            required: true,
            minlength: 2
        }
    },
    submitHandler: function (ele) {
        $.ajax({
            method: 'post',
            url: $(ele).attr('action'),
            data: $(ele).serialize(),
            success: function (res) {
                console.dir(res)
                if (res.status == 'y') {
                    alert(res.msg);
                }
                else{
                    alert(res.msg);
                }
            }
        })
    }
})