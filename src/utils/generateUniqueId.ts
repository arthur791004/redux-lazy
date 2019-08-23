let id: number = 1;

const generateUniqueId = () => `${id++}`;

export default generateUniqueId;
