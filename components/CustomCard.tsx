import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React, { ReactNode } from 'react'

type CustomCardProps = {
  cardTitle: string
  cardDescription?: string
  children?: ReactNode
}

export default function CustomCard({
  cardTitle,
  cardDescription,
  children,
}: CustomCardProps) {
  return (
    <Card className="max-w-[30rem]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        {cardDescription && (
          <CardDescription>{cardDescription}</CardDescription>
        )}
      </CardHeader>
      {children}
    </Card>
  )
}
