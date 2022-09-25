function log(text){
    console.log(text)
    $('.log').text(text)
}
function nextMove(){
    if(whoseMove=="x"){whoseMove="o"}else(whoseMove="x")
    if(whoseMove=="x"){
        $("svg.canvas").addClass("xmove")
        $("svg.canvas").removeClass("omove")
        $('.active').addClass("xh")
        $('.active').removeClass("oh")
        $('body').removeClass("omove")
        $('body').addClass("xmove")

    }
    if(whoseMove=="o"){
        $('body').removeClass("xmove")
        $('body').addClass("omove")

        $("svg.canvas").removeClass("xmove")
        $("svg.canvas").addClass("omove")
        $('.active').removeClass("xh")
        $('.active').addClass("oh")
    }
}
function sendMove(move,whoseMove){
    $.ajax({
        url: "move",
        data: {'whose':whoseMove,'move':$(move).attr('id')},
        success: function(result){
    
            if (result.success == "true"){
                // log("Update")
                $(move).addClass("xmove")
                whoseMove="o"   
            }
        }});
}
function updateScore(){
    $(".scoreX").text(scoreX)
    $(".scoreO").text(scoreO)
}
function parseSVG(s) {
    var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
    var frag= document.createDocumentFragment();
    while (div.firstChild.firstChild)
        frag.appendChild(div.firstChild.firstChild);
    return frag;
}
function addBox(box,lastMove){
    document.getElementById('boxDraw').appendChild(parseSVG(
    ('<circle class="box color'+lastMove+'" cx="'+box.posX+'" cy="'+box.posY+'" r="10" />')))
    ripple(main)

}
function verify(lastMove){
    ret = false
    for (const box of boxes){
        if(box.taken!="-"){continue}
        for(const line of box.LineIDs){
            // log($('.'+line).removeClass)
            if(! $('#'+line).hasClass("active")){
                // log($('.'+line).hasClass("active"))
                box.used+=1
            }
        }
        // log(box.used)
        if(box.used==4){
            log(lastMove+" took over "+box.BoxID+" ")
            console.log(box.LineIDs)
            box.taken=lastMove
            if(lastMove=="x"){scoreX+=1}
            if(lastMove=="o"){scoreO+=1}
            updateScore()
            addBox(box,lastMove)
            ret = true
        }
        box.used=0

    }
    return ret
    
}
function ripple(rippleElem){
    $('body').click(function (e){
        rippleElem = rippleElem.clone()
        var xPos = e.pageX-50;
        var yPos = e.pageY-50;
        rippleElem.css("left",xPos+'px')
        rippleElem.css("top",yPos+'px')
        rippleElem.appendTo('body')
        rippleElem.addClass("grow")
        
    
        console.log(xPos, yPos);
    });
}
$(function(){
    
    main = $('#rip')
    congo = $('.ripple.congrats')

    ripple(main)
    xmoves = []
    omoves = []
    // Fix the hover 
    $(".ln").hover(function(){
        $(this).appendTo(".top");
    })


    $(".ln").click(function () {
        move = $(this)
        chosen = $(this).attr('id')
        if((xmoves.includes(chosen)) | (omoves.includes(chosen))){log("Don't take the road already trodden!");return;}
        lastMove = whoseMove
        if(whoseMove == "x"){
                sendMove(move,whoseMove)
                xmoves.push($(move).attr('id'))
                $(move).addClass("xmove")
                $(move).removeClass("active")
                $(".log").text("xmove: "+move.attr('id'))

              
            }else{
                sendMove(move,whoseMove)
                omoves.push(move.attr('id'))
                $(move).addClass("omove")
                $(move).addClass("omove")
                $(move).removeClass("active")

                $(".log").text("omove: "+move.attr('id'))
            }
            if(!verify(whoseMove)){
                nextMove()
            }
        
    })

});