'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type Item = { id: string; name: string; imageUrl: string | null };

export default function ManageItemsPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isLoadingBrands, setIsLoadingBrands] = useState(false);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchBrands(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory && selectedBrand) {
            fetchItems(selectedCategory, selectedBrand);
        }
    }, [selectedCategory, selectedBrand]);

    const fetchCategories = async () => {
        setIsLoadingCategories(true);
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setIsLoadingCategories(false);
    };

    const fetchBrands = async (categoryId: string) => {
        setIsLoadingBrands(true);
        setBrands([]);
        setSelectedBrand(null);
        try {
            const response = await fetch(`/api/brands?categoryId=${categoryId}`);
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
        setIsLoadingBrands(false);
    };

    const fetchItems = async (categoryId: string, brandId: string) => {
        setIsLoadingItems(true);
        setItems([]);
        try {
            const response = await fetch(`/api/items?categoryId=${categoryId}&brandId=${brandId}`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setIsLoadingItems(false);
    };

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Manage Items</CardTitle>
                    <CardDescription>Select a category and brand to view items</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="category-select" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            {isLoadingCategories ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <Select
                                    onValueChange={(value) => setSelectedCategory(value)}
                                    value={selectedCategory || undefined}
                                >
                                    <SelectTrigger id="category-select">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.length > 0 ? (
                                            categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <p>No categories available</p>
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <div>
                            <label htmlFor="brand-select" className="block text-sm font-medium text-gray-700">
                                Brand
                            </label>
                            {isLoadingBrands ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <Select
                                    onValueChange={(value) => setSelectedBrand(value)}
                                    value={selectedBrand || undefined}
                                    disabled={!selectedCategory || brands.length === 0}
                                >
                                    <SelectTrigger id="brand-select">
                                        <SelectValue placeholder="Select a brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Items</h3>
                        {isLoadingItems ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, index) => (
                                    <Skeleton key={index} className="h-40 w-full" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {items.map((item) => (
                                    <Card key={item.id}>
                                        <CardContent className="p-4">
                                            {item.imageUrl && (
                                                <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-cover mb-2" />
                                            )}
                                            <h4 className="font-medium">{item.name}</h4>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                        {!isLoadingItems && items.length === 0 && (
                            <p className="text-gray-500">No items found for the selected category and brand.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}