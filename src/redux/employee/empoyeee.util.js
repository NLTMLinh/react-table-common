export const filterRecordLiesInCreateAndDelete = (state, action) => {
  return action.payload.filter(id => state.dataCreate.map(item => item.id).includes(id))
}

export const filterRecordDelete = (state, action) => {
  return action.payload.filter(id => !state.dataCreate.map(item => item.id).includes(id))
}

export const filterRecordCreate = (state, action) => {
  return [...state.dataCreate.filter(item => !action.payload.includes(item.id))]
}

export const filterDataSaved = (state, action) => {
  return [...state.data.filter(item => !state.dataCreate.map(item => item.id).includes(item.id)), ...action.payload]
}