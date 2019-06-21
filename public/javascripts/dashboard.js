$(document).ready(function(){
  $('.deleteProject').on('click', function(){
    // $target = $(e.target);
    // const id = $target.attr('data-id');
    deleteId = $(this).data('id');
    var confirmation = confirm('Are You Sure ?');
    if(confirmation)
    {
        $.ajax({
            type:'DELETE',
            url: '/admin/delete/'+deleteId,
            success: function(response){
                // alert('Deleting Article');
                // window.location.href='/admin';
            },
            error: function(err){
                console.log(err);
            }
        });
        window.location.href='/admin';
    }
    else
    {
        return false;
    }    
  });
});