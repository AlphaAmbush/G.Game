import React from 'react';

const Settings = ({colNameHandler,colNames}) => {
  
  let [items,setItems] = React.useState(colNames)
  const [divBeingDragged, setDivBeingDragged] = React.useState(null)
  const [divBeingReplaced, setDivBeingReplaced] = React.useState(null)
  
  const dragStart = (e) => {
    e.target.style.opacity = 0;
    setDivBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    e.target.style.background = "";
    setDivBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    e.target.style.opacity = "";
    const dataBeingDragged = items[divBeingDragged.getAttribute('data-id')]
    const dataBeingReplaced = items[divBeingReplaced.getAttribute('data-id')]
    let newItems = [...items]
    newItems[divBeingReplaced.getAttribute('data-id')] = dataBeingDragged
    newItems[divBeingDragged.getAttribute('data-id')] = dataBeingReplaced
    setItems(newItems)
  }

  const toggleVisibiliy =(e)=>{// to set visibility
    let index = e.target.getAttribute('data-id')
    let newItems = [...items]
    newItems[index].visible = !newItems[index].visible
    setItems(newItems)
  }
  
  React.useEffect(()=>{
    colNameHandler(items)
  }, items)
    
    return (<>
    <div className="settingDisplay">
      {items.map((item,index) => {
        return (
          <div 
            key={index} 
            className={`Settingitem ${item.visible ? 'itemVisible':''}`}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {e.preventDefault(); e.target.style.background = "blue";}}
            onDragLeave={(e) => {e.preventDefault(); e.target.style.background = "";}}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            onDoubleClick={(e)=>toggleVisibiliy(e)}
            >
              {item.name}
          </div>
        );
      })}
    </div>
    
    </>
  );
  
};

export default Settings;
