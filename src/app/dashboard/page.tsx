import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Dashboard</CardTitle>
                    <CardDescription>Select a tab from the sidebar to manage your items or travelers</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Choose an option from the sidebar to get started.</p>
                </CardContent>
            </Card>
        </div>
    );
}