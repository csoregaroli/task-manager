const addBtns = document.querySelectorAll('.add-btn:not(.solid)')
const saveItemBtns = document.querySelectorAll('.solid')
const addItemContainers = document.querySelectorAll('.add-container')
const addItems = document.querySelectorAll('.add-item')

// Item Lists
const listsColumns = document.querySelectorAll('.drag-item-list')
const backlogList = document.getElementById('backlog-list')
const progressList = document.getElementById('progress-list')
const completeList = document.getElementById('complete-list')
const onHoldList = document.getElementById('on-hold-list')

// Items
let updatedOnLoad = false

// Initialize Arrays
let backlogListArray = []
let progressListArray = []
let completeListArray = []
let onHoldListArray = []
let listArrays = []

// Drag Functionality
let draggedItem
let currentColumn

// Get Arrays from localStorage if available, set default values if not
const getSavedColumns = () => {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems)
        progressListArray = JSON.parse(localStorage.progressItems)
        completeListArray = JSON.parse(localStorage.completeItems)
        onHoldListArray = JSON.parse(localStorage.onHoldItems)
    } else {
        backlogListArray = ['Release the course', 'Sit back and relax']
        progressListArray = ['Work on projects', 'Listen to music']
        completeListArray = ['Being cool', 'Getting stuff done']
        onHoldListArray = ['Being uncool']
    }
}

// Set localStorage Arrays
const updateSavedColumns = () => {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray]
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold']
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]))
    })
}

// Create DOM Elements for each list item
const createItemEl = (columnEl, column, item, index) => {
    const listEl = document.createElement('li')
    listEl.classList.add('drag-item')
    listEl.textContent = item
    listEl.draggable = true
    listEl.setAttribute('ondragstart', 'drag(event)')
    // Append
    columnEl.appendChild(listEl)
}

// Update Columns in DOM
const updateDOM = () => {
    if (!updatedOnLoad) {
        getSavedColumns()
    }
    backlogList.textContent = ''
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogList, 0, backlogItem, index)
    })

    progressList.textContent = ''
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressList, 0, progressItem, index)
    })

    completeList.textContent = ''
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeList, 0, completeItem, index)
    })

    onHoldList.textContent = ''
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldList, 0, onHoldItem, index)
    })

    updatedOnLoad = true
    updateSavedColumns()
}

// Allows arrays to reflect Drag and Drop items
const rebuildArrays = () => {
    backlogListArray=[]
    for (let i = 0; i < backlogList.children.length; i++) {
        backlogListArray.push(backlogList.children[i].textContent)
    }
    progressListArray = []
    for (let i = 0; i < progressList.children.length; i++) {
        progressListArray.push(progressList.children[i].textContent)
    }
    completeListArray = []
    for (let i = 0; i < completeList.children.length; i++) {
        completeListArray.push(completeList.children[i].textContent)
    }
    onHoldListArray = []
    for (let i = 0; i < onHoldList.children.length; i++) {
        onHoldListArray.push(onHoldList.children[i].textContent)
    }
    updateDOM()
}

// When Item Starts Dragging
const drag = (e) => {
    draggedItem = e.target
}

// Column Allows for Item to Drop
const allowDrop =(e) => {
    e.preventDefault()
}

// When Item Enters Column Area
const dragEnter = (column) => {
    listsColumns[column].classList.add('over')
    currentColumn = column
}

// Dropping Item in Column
const drop = (e) => {
    e.preventDefault()
    listsColumns.forEach((column) => {
        column.classList.remove('over')
    })
    const parent  = listsColumns[currentColumn]
    parent.appendChild(draggedItem)
    rebuildArrays()
}

// On Load
updateDOM()