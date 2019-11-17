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
// 处理日期时间格式
function formateDate(date) {
    date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
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
