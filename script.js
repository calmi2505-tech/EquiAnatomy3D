*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html,
body{
    width:100%;
    height:100%;
    overflow:hidden;
    font-family:Arial, Helvetica, sans-serif;
    background:#111;
}

#app{
    display:flex;
    width:100vw;
    height:100vh;
}

#menu{
    width:280px;
    background:#1f2937;
    color:white;
    padding:20px;
}

#menu h2{
    margin-bottom:20px;
}

#menu button{
    display:block;
    width:100%;
    margin-bottom:10px;
    padding:12px;
    border:none;
    border-radius:8px;
    background:#374151;
    color:white;
}

#viewer{
    flex:1;
    width:calc(100vw - 280px);
    height:100vh;
    position:relative;
}

#canvas3d{
    position:absolute;
    inset:0;
    }
