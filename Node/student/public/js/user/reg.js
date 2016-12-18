$('#dataForm').validate({
    rules: {
        user_name: {
            required: true,
            minlength: 2
        },
        pwd:{
            required: true,
            minlength: 6
        },
        rePWD:{
            required: true,
            minlength: 6,
            equalTo:'#pwd'
        },
        name: {
            required: true,
            minlength: 2
        },
        email: {
            email: true,
            required: true,
        },
        birthday: {
            required: true,
            dateISO: true
        },
        mobile: {
            isMobile: true,
            required: true
        },
        address: {
            required: true,
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
                    alert(res.msg)
                    window.location.href = '/user/user_info'
                }
                else {
                    alert(res.msg)
                }
            }
        })
    }
})

