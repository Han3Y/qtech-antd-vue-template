const fileUpload = {
  state: {
    fileList: [],
    fileListMap: {}
  },
  mutations: {
    ADD_FILE: (state, file) => {
      if(!state.fileListMap[file.uid]){
        state.fileList.push(file);
        state.fileListMap[file.uid] = file;
      }
    },
    CHANGE_FILE_STATE: (state, file) => {
      state.fileListMap = Object.assign({...state.fileListMap}, {
        [file.uid]: file
      });
    }
  }
}

export default fileUpload;