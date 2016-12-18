$(function() {

    // 博客删除
    $(".delBlog").on('click', function(ev) {
        var status = confirm("确认删除这条博客?");
        if (status == true) {
            var id = this.id;
            ev.preventDefault();
            $.ajax({
                type: "get",
                url: "/api/blog_delete",
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

    // 博客分类过滤
    $('#sort option').on('click', function() {
        var typeId = this.id
        location.href = '/show/blog_list?type=' + typeId;
        // $.ajax({
        //     type: "get",
        //     url: "/show/blog_list",
        //     data: {
        //         id: typeId
        //     },
        //     dataType: "json",
        //     success: function(res) {
        //         console.log(res)
        //     }
        // });
    })
    $('#searchBtn').on('click', function() {
        var search = $('#search').val()
        if (search) {
            location.href = '/show/blog_list?search=' + search;
        } else {
            location.reload();
        }
    })
})