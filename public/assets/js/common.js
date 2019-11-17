$('#logout').on('click',function () {
    let isConfirm = confirm('你是否要退出？');
    if (isConfirm) {
        $.ajax({
            type:'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert('退出失败')
            }
        })
    }
})

// 处理日期时间格式
function formateDate(date) {
    date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}