"use strict";function renderAllNodes(){Nodes.forAll(function(e,n){fill(51),n.isCity&&(fill(50,200,0),text(cityDict[n.id],n.x*environment.scale+5,n.y*environment.scale-5));ellipse(n.x*environment.scale,n.y*environment.scale,10,10)})}function mousePressed(){Nodes.forAll(function(e,n){dist(mouseX,mouseY,n.x*environment.scale,n.y*environment.scale)<5&&console.log("node clicked",Nodes.getById(e))});for(var e in cars){var n=cars[e];mouseX>n.position.x*environment.scale&&mouseX<n.position.x*environment.scale+environment.carSize&&mouseY>n.position.y*environment.scale&&mouseY<n.position.y*environment.scale+environment.carSize&&console.log("car clicked",n)}}function showPathFor(e){if(e){var n=e.home,o=e.location,i=e.next,l=e.target,s=e.moveStack;n&&(fill("#00FFFF"),ellipse(n.x*environment.scale,n.y*environment.scale,20,20)),o&&(fill("#FF0000"),ellipse(o.x*environment.scale,o.y*environment.scale,15,15)),l&&(fill("#00FF00"),ellipse(l.x*environment.scale,l.y*environment.scale,10,10)),i&&(fill("#0000FF"),ellipse(i.x*environment.scale,i.y*environment.scale,5,5));for(var t=e.position,r=0;r<s.length;r++){var c=Nodes.getById(s[r]);stroke(100,50,0),line(c.x*environment.scale,c.y*environment.scale,t.x*environment.scale,t.y*environment.scale),t=c}}}function debugMagic(){for(var e in debugged){var n=debugged[e];"car"==n.type&&showPathFor(n)}}
//# sourceMappingURL=dev.js.map
