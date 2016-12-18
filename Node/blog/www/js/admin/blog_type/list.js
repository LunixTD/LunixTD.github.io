$(function() {

    // 博客分类删除
    $(".delType").on('click', function(ev) {
        var status = confirm("确认删除此分类?");
        if (status == true) {
            var id = this.id;
            ev.preventDefault();
            $.ajax({
                type: "get",
                url: "/api/blog_type_delete",
                data: { id: id },
                dataType: "json",
                success: function(res) {
                    if (res.status == 'y') {
                        alert(res.msg)
                        location.reload();
                    } else {
                        alert('删除时遇到未知错误,删除失败!')
                    }

                }
            });
        }
    })
})