"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Prop{
	children: ReactNode
}

function Provider(props:Prop) {
	return (
		<SessionProvider>{props.children}</SessionProvider>
	)
}

export default Provider