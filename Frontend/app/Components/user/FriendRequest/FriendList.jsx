'use client'
import React, { useEffect, useState } from 'react'
import { getFriendsList } from '@/app/services/addFriend'

const FriendList = () => {
  const [userId, setUserId] = useState(null)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) setUserId(JSON.parse(user).id)
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchFriends = async () => {
      try {
        const res = await getFriendsList(userId)
        setFriends(res.data)
      } catch (error) {
        console.error("Error fetching friends list:", error)
      }
    }

    fetchFriends()
  }, [userId])

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <h2>Friend List</h2>

      {friends.length === 0 && <p>No Friends Found</p>}

      {friends.map(friend => (
        <div key={friend.friendId} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: 8 }}>
          <p>{friend.friendName}</p>
        </div>
      ))}
    </div>
  )
}

export default FriendList
