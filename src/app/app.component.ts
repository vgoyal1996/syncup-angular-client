import { Component, OnInit } from '@angular/core';
import { create } from 'rxjs-spy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'syncup-angular-client';

  constructor() {

  }
  ngOnInit(): void {
    const spy = create();
    spy.show();
    //  // Open document
    //  this.pdfmake.create();

    //  // Configure text styles  
    //  this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true } });
 
    //  // Add a text with style
    //  this.pdfmake.addText('This is a header, using header style', 'header');
 
    //  // Add simple text
    //  this.pdfmake.addText('This is an sample PDF printed with pdfMake');
 
    //  // Add large text
    //  this.pdfmake.addText('Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines');
 
    //  // Array with colums
    //  const columns = [
    //      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
    //      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
    //  ];
 
    //  // Add columns
    //  this.pdfmake.addColumns(columns);
 
    //  // List to add
    //  const list1 = ['item 1', 'item 2', 'item 3'];
    //  const list2 = ['item 1', 'item 2', 'item 3'];
    //  const list3 = ['item 1', 'item 2', 'item 3'];
    //  const list4 = ['item 1', 'item 2', 'item 3'];
 
    //  // Adding unordered list
    //  this.pdfmake.addUnorderedlist(list1);
 
    //  // Adding ordered list
    //  this.pdfmake.addOrderedList(list2);

    //  this.pdfmake.print();
 
  }
}