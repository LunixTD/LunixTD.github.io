$.validator.setDefaults({
    errorElement: "em", //错误信息显示的标签
    errorPlacement: function(error, element) {
        // Add the `help-block` class to the error element
        error.addClass("help-block");

        // Add `has-feedback` class to the parent div.form-group
        // in order to add icons to inputs
        element.parents(".form-group").addClass("has-feedback");

        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }

        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!element.next("span")[0]) {
            $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
        }
    },
    success: function(label, element) {
        // Add the span element, if doesn't exists, and apply the icon classes to it.
        if (!$(element).next("span")[0]) {
            $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
        }
    },
    highlight: function(element, errorClass, validClass) {
        $(element).parents(".form-group").addClass("has-error").removeClass("has-success");
        $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).parents(".form-group").addClass("has-success").removeClass("has-error");
        $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
});

$('#dataForm').validate({
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        description: {
            required: true,
            minlength: 10
        }
    },
    submitHandler: function(ele) {
        $.ajax({
            method: 'post',
            url: $(ele).attr('action'),
            data: $(ele).serialize(),
            success: function(res) {
                console.dir(res)
                if (res.status == 'y') {
                    alert(res.msg);
                    location.href = '/show/blog_type_list';
                } else {
                    alert(res.msg);
                }
            }
        })
    }
})