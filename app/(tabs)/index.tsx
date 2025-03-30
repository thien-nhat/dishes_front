import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import supabase from './supabaseClient';

export default function HomeScreen() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      let { data, error } = await supabase
        .from('dishes')
        .select(`
          id,
          image_link,
          name,
          nutrition_info,
          dish_categories (
            categories
          ),
          dish_cooking (
            cooking_instructions
          ),
          dish_ingredients (
            ingredients
          ),
          dish_preparations ( 
            preparation
          ),
          dish_serving (
            serving_instructions
          ),
          dish_tags (
            tags
          ),
          dish_tips (
            tips
          )
        `);

      if (error) {
        console.log('Error fetching dishes:', error);
      } else {
          const transformedData = data?.map(dish => ({
              ...dish,
              categories: dish.dish_categories.map(item => item.categories),
              cooking_instructions: dish.dish_cooking.map(item => item.cooking_instructions),
              ingredients: dish.dish_ingredients.map(item => item.ingredients),
              preparation: dish.dish_preparations.map(item => item.preparation),
              serving_instructions: dish.dish_serving.map(item => item.serving_instructions),
              tags: dish.dish_tags.map(item => item.tags),
              tips: dish.dish_tips.map(item => item.tips),
          })) || [];
        setDishes(transformedData || []);
      }
      setLoading(false);
    };

    fetchDishes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Image: {item.image_link}</Text>
            <Text style={styles.itemText}>Nutrition Info: {item.nutrition_info}</Text>
            <Text style={styles.itemText}>Categories: {JSON.stringify(item.categories)}</Text>
            <Text style={styles.itemText}>Cooking Instructions: {JSON.stringify(item.cooking_instructions)}</Text>
            <Text style={styles.itemText}>Ingredients: {JSON.stringify(item.ingredients)}</Text>
            <Text style={styles.itemText}>Preparation: {JSON.stringify(item.preparation)}</Text>
            <Text style={styles.itemText}>Serving Instructions: {JSON.stringify(item.serving_instructions)}</Text>
            <Text style={styles.itemText}>Tags: {JSON.stringify(item.tags)}</Text>
            <Text style={styles.itemText}>Tips: {JSON.stringify(item.tips)}</Text>

          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
  },
});