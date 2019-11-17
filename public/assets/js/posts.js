$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response)
        let html = template('postsTpl',response);
        $('#postsBox').html(html)
        let page = template('pageTpl',response);
        $('#pageBox').html(page)
    }
});

//处理分页页码
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page:page
        },
        success: function (response) {
            // console.log(response)
            let html = template('postsTpl',response);
            $('#postsBox').html(html)
            let page = template('pageTpl',response);
            $('#pageBox').html(page)
        }
    });
}
//文章类型查询
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response)
        let html = template('filterTpl',{data:response});
        $('#categoryBox').html(html)
    }
});
//当用户进行文章筛选的时候
$('#filterForm').on('submit',function () {
    let formData = $(this).serialize()
    // 向服务器发送请求，根据条件索要文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            // console.log(response)
            let html = template('postsTpl',response);
            $('#postsBox').html(html)
            let page = template('pageTpl',response);
            $('#pageBox').html(page)
        }
    });
    return false;
})

  // 模态框
$(function () {
    var id, userId;
    $('#postsBox').on('click', ".postCom", function () {
        id = $(this).data('id')
        console.log(id, 678);
        userId = JSON.parse(localStorage.getItem('user'))._id
        console.log(userId, 444);
        $('#exampleModal').modal('show')
    })

    /* 点击发布 */
    $('.addCom').on('click', function () {
        var content = $('#message-text').val()
        // console.log(content, 1111);
        $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                author: userId,
                content: content,
                post: id
            },
            success: function (res) {
                console.log(res, 543);
                $('#exampleModal').modal('hide')
            }
        })
    })
})

