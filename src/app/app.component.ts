import { ConstantPool, getParseErrors } from '@angular/compiler';
import { Component } from '@angular/core';
import { graphviz }  from 'd3-graphviz';
import { HttpClient } from '@angular/common/http';
//clasesPropias

import { __core_private_testing_placeholder__ } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  title = 'Interprete';


 
  constructor(private http:HttpClient){
  }
  
  ban:boolean=true;

 /**VARIABLES UTLIZADas */
  /**==================================== */
  content:String="# Hola ";
  consola:String="consola :3";
  
  grafico:String="";

  exceptions:any=[];
  simbolos:any=[];
  /**================================= */
  clear(){
    this.content = "# Ciao ";
    this.consola = "consola :3"
    graphviz('#graph').renderDot('digraph { JOLC -> Hello}');
  }

  
  interpretar(){
   this.http.post<any>('https://jolc-ss.herokuapp.com/Interpreting/',{"codigo":this.content}).subscribe(
      (res) => { if(res.msg){
        this.consola = res.output
        this.exceptions =  res.exceptions;
        this.simbolos = res.simbols
      }}, (err) => console.log(err)
    );
    
  }

  getTree(){
    this.http.post<any>('https://jolc-ss.herokuapp.com/Tree/',{"codigo":this.content}).subscribe(
       (res) => { if(res.msg){
        this.grafico = res.graphic
        console.log(res.graphic)
        if (this.grafico != ""){
          graphviz('#graph').renderDot(''+this.grafico);
        }else{
          alert("No hay codigo para graficar")
        }

       }}, (err) => console.log(err)
     );
     
   }

   generateTree():void{
    
   }


  getSimbol(){
    this.http.get<any>('http://127.0.0.1:5000/simbolos//').subscribe(
      (res) => { 
        this.simbolos = res.simbolos;
        console.log(res.simbolos)
      }, (err) => console.log(err)
    );
  }

}






