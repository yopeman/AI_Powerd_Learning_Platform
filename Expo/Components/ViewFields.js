import React from 'react'
import {View} from "react-native";

export default function ViewFields({fields}) {
  return (
    <View>
      {fields && fields.map((field) => (
        <View key={field?.id}>
          <Text>Title: {field?.title}</Text>
          <Text>Description: {field?.description}</Text>
          <Text>Years Length: {field?.years_length}</Text>
          <Text>Is Free: {field?.isFree}</Text>
          <Text>Number Of Free Topics: {field?.number_of_free_topics}</Text>
          {/*<Text>Created At: {new Date(field?.createdAt).toLocaleString()}</Text>*/}
          {/*<Text>Updated At: {new Date(field?.updatedAt).toLocaleString()}</Text>*/}
        </View>
      ))}
    </View>
  )
}
