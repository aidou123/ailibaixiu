// 获取评论列表数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        // console.log(response);
        let html = template('commentsTpl',response);
        $('#commentsBox').html(html)
    }
});
//分页功能
$.ajax({
    type: "get",
    url: "/posts/",
    data: {
        page: page
    },
    success: function (response) {
        console.log(response);
        let html = template('commentsTpl',response);
        $('#commentsBox').html(html)
        let pageHtml = template('pageTpl',response);
        // $('#pageBox').html(pageHtml)
    }
});
// 评论状态
$('#commentsBox').on('click','.status',function () {
    let state = $(this).attr('data-state');
    let id =  $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/comments/${id}`,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    });
})
//删除评论
$('#commentsBox').on('click','.delete',function () {
    let id =  $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: `/comments/${id}`,
        success: function () {
            location.reload()
        }
    });
})