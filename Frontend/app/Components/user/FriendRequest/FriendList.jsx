"use client"
import React, { useEffect, useState } from 'react'
import { getFriendsList } from '@/app/services/addFriend'

const FriendList = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) return

    const fetchFriends = async () => {
      try {
        const res = await getFriendsList(JSON.parse(user)._id)
        setFriends(res.friends)
      } catch (error) {
        console.error("Error fetching friends list:", error)
      }
    }

    fetchFriends()
  }, [])

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <h2>Friend List</h2>

      {friends.length === 0 && <p>No Friends Found</p>}

      {friends.map(friend => (
        <div key={friend.friendId} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: 8 }}>
          <p>{friend.senderEmail}</p>
        </div>
      ))}
    </div>
  )
}

export default FriendList
