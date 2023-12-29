import orderConsumer from "../events/consumer/orderconsumer"


const orderController = {
    async orderRecieved ()  {
        const orderdata = await orderConsumer.orderDetailsConsumer()        
        console.log(orderdata);
        
    }
}
export default orderController

// {
//     _id: '658c4856740484642ea26f8e',
//     userId: '6588fd15adc8314beb13bcde',
//     refId: '658c4855c0a8be84cf8fc515',
//     username: 'Aswanth6000',
//     phone: 7025552608,
//     email: 'aswanth682@gmail.com',
//     profilePicture: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1702699216/skillVibe/Date%20with%20santa%20song%20cover.jpg.jpg',
//     status: true,
//     skills: [],
//     title: 'nmnn',
//     gigdescription: 'kkk',
//     price: 44,
//     tags: 'hh',
//     image1: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703692373/skillVibe/_81eaa63c-1b51-49e1-95a4-042b16995d59.jpg.jpg',
//     image2: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703477502/skillVibe/_d531c00d-b1a6-4aae-b657-76e5887ec602.jpeg.jpg.jpg',
//     image3: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1703683434/skillVibe/_8120ff27-8ce3-4727-a04d-2dd1cc7a5e84.jpg.jpg',
//     video: '',
//     __v: 0,
//     buyerId: '658cfae3b4f3ade34364ec01',
//     buyername: 'Muhammed',
//     buyeremail: 'jauharp02@gmail.com',
//     buyerphone: 8746374893,
//     buyerProfile: 'https://res.cloudinary.com/dihrwghx2/image/upload/v1699291554/admin-user-react/default-pic_rkk3gl.jpg'
//   }