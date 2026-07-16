// app/create-event/page.tsx

import CreateEventForm from "@/component/CreateEvent";



const CreateEventPage = () => {
    return (
        <main className="wrapper py-10">
            <h1 className="ml-76">Create Event</h1>

            <CreateEventForm />
        </main>
    );
};

export default CreateEventPage;