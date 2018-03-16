// start 8pm
class calendar {
  constructor(component) {
    this.headerText;
    this.daysTable;
    this.leftButton;
    this.rightButton;
    this.initComponents(component);

    //0-11 jan-dec
    this.month;
    //2018
    this.year;
    this.initYearAndMonth();

    this.render();
  }

  initComponents(component){
    //header
    const headerText = document.createElement('h2');

    //table
    const daysTable = document.createElement('table');
    //insert first row
    const firstRow = daysTable.insertRow(0);
    calendar.TABLE_HEADERS.forEach(char => {
      const cell = firstRow.insertCell(-1);
      cell.innerHTML = char;
    });

    //buttons
    const leftButton = document.createElement('button');
    const rightButton = document.createElement('button');
    leftButton.appendChild(document.createTextNode('<<'));
    rightButton.appendChild(document.createTextNode('>>'));
    leftButton.onclick = this.onClick.bind(this, -1);
    rightButton.onclick = this.onClick.bind(this, 1);

    component.appendChild(headerText);
    component.appendChild(daysTable);
    component.appendChild(leftButton);
    component.appendChild(rightButton);

    this.headerText = headerText;
    this.daysTable = daysTable;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
  }

  initYearAndMonth(){
    //split the iso string here
    const isoStr = (new Date()).toISOString();
    const arr = isoStr.split('-');
    this.month = parseInt(arr[1]) - 1;
    this.year = parseInt(arr[0]);
  }

  onClick(diffMonth){
    this.year += Math.floor((this.month + diffMonth) / 12);
    this.month = (12 + this.month + diffMonth) % 12;
    this.render()
  }

  getDay(){
    return (new Date(this.year, this.month, 1)).getDay();
  }

  getDaysInMonth() {
    return (new Date(this.year, this.month + 1, 0)).getDate();
  }

  render(){
    this.headerText.innerHTML = `${calendar.MONTHS[this.month]} ${this.year}`;

    //draw out new table
    const firstDayofTheMonth = this.getDay();
    const totalDays = this.getDaysInMonth();
    let filledDays = 0, row = 1, col = 0;
    while(filledDays < totalDays || col !== 0){
      let currentRow = this.daysTable.rows[row] ? this.daysTable.rows[row] : this.daysTable.insertRow(-1);
      let currentCell = currentRow.cells[col] ? currentRow.cells[col] : currentRow.insertCell(-1);

      currentCell.innerHTML = '';
      if((filledDays === 0 && col == firstDayofTheMonth) ||
        (filledDays > 0 && filledDays < totalDays)){
        filledDays++;
        currentCell.innerHTML = filledDays;
      }

      row += Math.floor((col + 1) / 7);
      col = (col + 1) % 7;
    }

    const rowLen = this.daysTable.rows.length;
    for(var i = row; i < rowLen; i++){
      this.daysTable.deleteRow(i);
    }
  }

}

calendar.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
calendar.TABLE_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


// main
const mycalendar = new calendar(document.getElementById('calendar'));


