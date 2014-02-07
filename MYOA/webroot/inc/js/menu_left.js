function clickMenu(id)
{
    var el=document.getElementById("module_"+id);
    var link=document.getElementById("link_"+id);
    if(!el || !link)   return;
    if (el.style.display=="none")
    {
       el.style.display='';
       link.className="active";
    }
    else
    {
       el.style.display="none";
       link.className="";
    }
}
