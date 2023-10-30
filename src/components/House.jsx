import React, { useState } from 'react'
import { FaHeart,FaRegHeart} from 'react-icons/fa';
import {UserAuth} from '../context/AuthContext'
import {db} from '../firebase'
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'
import { GoBookmark, GoBookmarkFill } from 'react-icons/go';


const House = ({item, item2}) => {

    const [like,setLike] = useState(false);
    const [saved,setSaved] = useState(false);
    const {user} = UserAuth();

    const propertyID = doc(db,'users',`${user?.email}`)

    const saveProperty = async()=>{
        if(user?.email){
          setLike(!like)
          setSaved(true)
          await updateDoc(propertyID,{
            savedProperty: arrayUnion({
                x: item2.x,
                y: item2.y,
                project: item2.project,
                location: item2.street,
                roomNo: item.noOfBedRoom,
              type: item.propertyType,
              
              area: item.areaSqft,
              price: item.rent
            })
          })
        }else{
          alert("please log in to save")
        }
      }

  return (
    <li className ="bg-gray-400 p-2">
            <h3></h3>
            <div>
            <p>{item2?.project} @ {item2?.street}</p>
            </div>
            
            <ul className="flex flex-col justify-between relative items-center">
              {
                <div className="bg-gray-600 rounded-[20px] flex justify-between items-center h-24 xl:max-w-[1240px] md:w-full px-4 text-white relative z-[100] top-4 xl:mx-auto md:mx-4 mt-1">
                  <li >{item?.propertyType}</li>
                  <li>No. of Rooms: {item?.noOfBedRoom}</li>
                  <li>AreaSqft: {item?.areaSqft}</li>
                <li className="flex">
                  <li className = "p-2">Rent Price: {item?.rent}</li>
                  <li>
                        {like ? (
                          // Display GoBookmarkFill if the property is in favorites
                          <button>
                            <GoBookmarkFill size={28} />
                          </button>
                        ) : (
                          // Display GoBookmark if the property is not in favorites
                          <button onClick={saveProperty}>
                            <GoBookmark size={28} />
                          </button>
                        )}
                        
                    </li>
                  
                </li>
                
                </div>
              }
            </ul>
          </li>
          
  )
}

export default House