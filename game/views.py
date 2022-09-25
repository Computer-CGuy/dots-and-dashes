from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

from django.http import JsonResponse
import time

d = {}
def index(request):
    l = []
    line = {}
    nosX =9
    nosY = 9
    scale = 50
    canvasWidth = (nosY+1)*scale
    canvasHeight = (nosX+1)*scale
    
    for x in range(1,nosX+1): 
        for y in range(1,nosY+1): 
            l.append((x*scale,y*scale))
    idx = 0
    for y in range(1,nosY+1):
        for x in range(2,nosX+1):
            line[idx] = {"x1":(x-1)*scale,"y1":y*scale,"x2":x*scale,"y2": y*scale}; idx+=1
    for x in range(1,nosY+1):
        for y in range(2,nosX+1):
            line[idx] = {"x1":(x)*scale,"y1":(y-1)*scale,"x2":x*scale,"y2": y*scale}; idx+=1
    # for x in range(1,len(l)): lines.append((l[x-1],l[x]))
    boxes = []
    boxID=0
    for indX in range((nosX-1)):
        for indY in range(nosY-1):
            ln=([indX*(nosY-1)+(indY%(nosY-1)),
            indX*(nosY-1)+(indY%(nosY-1))+(nosY-1),
            72+(indX%8)+(indY%9)*8,
            72+(indX%8)+((indY+1)%9)*8])
            boxes.append({"BoxID":boxID,"posX":(indY+1.5)*scale,"posY":(indX+1.5)*scale,"Lines":ln,"LineIDs":["line"+str(x) for x in ln],"used":0,"taken":"-"})
            boxID+=1
            

    print(boxes)
    context = {
        "list" : l,
        "lines": line,
        "canvasWidth":canvasWidth,
        "canvasHeight":canvasHeight,
        "boxes":boxes
    }
    return render(request, "myfirst.html", context)

def move(request):
    if request.method == "GET":
        d  = (request.GET['move'])

        return JsonResponse({'success':'true'})

def opponent(request):
    if request.method == "GET":
        # print(request.data)
        time.sleep(10)
        return JsonResponse({'success':'true'})
