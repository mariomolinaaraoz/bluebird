'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function AvatarUser({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}) {
  const supabase = createClientComponentClient<Database>()
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  useEffect(() => {
    if (url?.startsWith("https://")) {
      setAvatarUrl(url)
    } else {
      if (url) downloadImage(url)
    }
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className=''>
      <Image
        src={avatarUrl || "/default-avatar.png"}
        alt="Avatar del usuario"
        width={100}
        height={100}
        className="rounded-full"
      />
      <Label
        className="absolute top-36 left-64 rounded-full w-12 h-12 flex items-center justify-center p-0 bg-secondary button"
        htmlFor="single"
      >
        {uploading ? 'Uploading ...' : 'Edit'}
      </Label>
      <Input
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
        id="single"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  )
}