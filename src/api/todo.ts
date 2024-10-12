import { supabase } from '../lib/supabaseClient'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export const getTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: true })
  
  if (error) throw error
  return data || []
}

export const createTodo = async (text: string): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .insert({ text, completed: false })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteTodo = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

