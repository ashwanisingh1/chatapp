var generateMessage = (from,text)=>{
  return {
  from:from,
  text:text,
  createdAt:new Date().getTime()
 };
};

var generateLocationMessage = (from,coords)=>{
  return {
    from:from,
    url:`https://www.google.com/maps/?q=${coords.latitude},${coords.longitude}`,
    createdAt:new Date().getTime()
  };
};

module.exports = {generateMessage,generateLocationMessage};
