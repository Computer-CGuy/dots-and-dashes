from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render

def index(request):
    l = []
    line = {}
    nosX =10
    nosY = 10
    scale = 40
    canvasWidth = (nosY)*scale
    canvasHeight = (nosX)*scale
    
    for x in range(1,nosX): 
        for y in range(1,nosY): 
            l.append((x*scale,y*scale))
    idx = 0
    for y in range(1,nosY):
        for x in range(2,nosX):
            line[idx] = {"x1":(x-1)*scale,"y1":y*scale,"x2":x*scale,"y2": y*scale}; idx+=1
    for x in range(1,nosY):
        for y in range(2,nosX):
            line[idx] = {"x1":(x)*scale,"y1":(y-1)*scale,"x2":x*scale,"y2": y*scale}; idx+=1
    # for x in range(1,len(l)): lines.append((l[x-1],l[x]))
    context = {
        "list" : l,
        "lines": line,
        "canvasWidth":canvasWidth,
        "canvasHeight":canvasHeight
    }
    return render(request, "myfirst.html", context)