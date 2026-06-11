import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { User } from "../types/user";

const mockUsers: User[] = [
  {
    id:{ name: "UUID", value: "123e4567-e89b-12d3-a456-426614174000" },
    gender: "female",
    name: { title: "Miss", first: "Manuela", last: "González" },
    location: {
      street: { number: 456, name: "Calle de Alcalá" },
      city: "Móstoles",
      state: "Cantabria",
      country: "Spain",
      postcode: 15088,
      coordinates: {
        latitude: "40.4168",
        longitude: "-3.7038"
      },
      timezone: {
        offset: "+01:00",
        description: "Central European Time"
      }
    },
    email: "manuela.gonzalez@example.com",
    login: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "manuela.gonzalez",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    phone: "996-813-006",
    cell: "600-123-456",
    dob: { date: "2007-08-03T17:36:56.372Z",    age: 18 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/women/94.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/94.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/94.jpg",
    },
    nat: "ES",
  },
  {
    id: { name: "UUID", value: "123e4567-e89b-12d3-a456-426614174001" },
    gender: "male",
    name: { title: "Mr", first: "Jordan", last: "Alvarez" },
    location: {
      street: { number: 456, name: "Main Street" },
      city: "Austin",
      state: "Texas",
      country: "USA",
      postcode: 73301,
      coordinates: {
        latitude: "30.2672",
        longitude: "-97.7431"
      },
      timezone: {
        offset: "+06:00",
        description: "Central Time"
      }
    },
    email: "jordan@pixelforge.dev",
    login: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "jordan.alvarez",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    phone: "512-555-0148",
    cell: "512-555-0149",
    dob: { date: "1989-05-15T00:00:00.000Z", age: 34 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/men/32.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/32.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
    },
    nat: "US",
  },
  {
    id: { name: "UUID", value: "123e4567-e89b-12d3-a456-426614174002" },
    gender: "female",
    name: { title: "Ms", first: "Sofia", last: "Kim" },
    location: {
      street: { number: 789, name: "Queen Street" },
      city: "Toronto",
      state: "Ontario",
      country: "Canada",
      postcode: "M5V 2T6",
      coordinates: {
        latitude: "43.6532",
        longitude: "-79.3832"
      },
      timezone: {
        offset: "-05:00",
        description: "Eastern Time"
      }
    },
    email: "sofia@harborhq.co",
    login: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "sofia.kim",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    phone: "416-555-0198",
    cell: "416-555-0199",
    dob: { date: "1993-01-25T00:00:00.000Z", age: 31 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/women/63.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/63.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/63.jpg",
    },
     nat: "CA",},
  {
    id: { name: "UUID", value: "123e4567-e89b-12d3-a456-426614174003" },
    gender: "male",
    name: { title: "Mr", first: "Noah", last: "Patel" },
    location: {
      street: { number: 789, name: "Baker Street" },
      city: "London",
      state: "England",
      country: "UK",
      postcode: "SW1A 1AA",
      coordinates: {
        latitude: "51.5074",
        longitude: "-0.1278"
      },
      timezone: {
        offset: "±00:00",
        description: "Greenwich Mean Time"
      }
    },
    email: "noah@brightlane.ai",
    phone: "020-5555-0199",
    cell: "020-5555-0199",
    login:{
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "noah.patel",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    dob: { date: "1995-03-10T00:00:00.000Z",   age: 29 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "GB",
  },
  {
    id: { name: "UUID", value: "123e4567-e89b-12d3-a456-426614174004" },
    gender: "female",
    name: { title: "Ms", first: "Lina", last: "Brooks" },
    location: {
      street: { number: 123, name: "Main Street" },
      city: "Berlin",
      state: "Berlin",
      country: "Germany",
      postcode: 10115,
      coordinates: {
        latitude: "52.5200",
        longitude: "13.4050"
      },
      timezone: {
        offset: "+01:00",
        description: "Central European Time"
      }
    },
    email: "lina@signalworks.io",
    phone: "030-555-0147",
    cell: "030-555-0147",
    login: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "lina.brooks",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    dob: { date: "1986-07-20T00:00:00.000Z", age: 38 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/women/48.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/48.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/48.jpg",
    },
    nat: "DE",
  },
  {
    id: { name: "UUID", value: "123e4567-e89b-12d3-a456-426614174005" },
    gender: "male",
    name: { title: "Mr", first: "Marcus", last: "Reed" },
    location: {
      street: { number: 123, name: "Main Street" },
      city: "Sydney",
      state: "New South Wales",
      country: "Australia",
      postcode: 2000,
      coordinates: {
        latitude: "-33.8688",
        longitude: "151.2093"
      },
      timezone: {
        offset: "+10:00",
        description: "Eastern Australia Time"
      }
    },
    email: "marcus@climbup.com",
    cell: "02-5555-0188",
    login: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      username: "marcus.reed",
      password:"password123",
      salt: "random_salt",
      md5: "5f4dcc3b5aa765d61d8327deb882cf99",
      sha1: "7c4a667d782b8e0a9d8c9b1e5f1e6b2c3a4d5e",
      sha256:"ef92b778ba5caeecdeedbfbddc8eaeaa0c9f0a1b2c3d4e5f67890abcdef1234567890"
    },
    phone: "02-5555-0188",
    dob: { date: "1983-04-12T00:00:00.000Z", age: 41 },
    registered: { date: "2015-09-12T14:22:30.123Z", age: 10 },
    picture: {
      large: "https://randomuser.me/api/portraits/men/11.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/11.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/11.jpg",
    },
    nat: "US",
  },
];

export function Welcome() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockUsers.map((user) => {
              const fullName = `${user.name.first} ${user.name.last}`;
              const locationText = `${user.location.city}, ${user.location.country}`;

              return (
                <article
                  key={user.id.value}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.picture.medium}
                        alt={fullName}
                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900">{fullName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <FiMail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4" />
                      <span>{locationText}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiPhone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
