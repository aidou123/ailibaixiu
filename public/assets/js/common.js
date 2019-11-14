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