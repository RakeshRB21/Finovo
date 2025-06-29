# Finovo - Modern Financial Platform

A comprehensive financial literacy and management platform built with React, TypeScript, and Supabase. Finovo helps users master personal finance, track expenses, manage investments, and achieve their financial goals.

## 🚀 Features

### 📊 **Financial Dashboard**
- Real-time financial overview with key metrics
- Expense tracking and categorization
- Investment portfolio monitoring
- Budget analysis using the 50/30/20 rule
- Financial goal progress tracking

### 💰 **Expense & Investment Tracking**
- Quick transaction entry (expenses and investments)
- Automatic categorization (needs, wants, savings)
- Monthly trend analysis
- Category-wise expense breakdown
- Investment returns tracking

### 🎯 **Goal Management**
- Set and track financial goals
- Priority-based goal organization
- Progress visualization
- Target date tracking
- Multiple goal categories (home, car, education, etc.)

### 🧮 **Financial Calculators**
- **SIP Calculator**: Calculate systematic investment plan returns
- **EMI Calculator**: Loan EMI calculations for home, car, personal loans
- **Retirement Planner**: Plan retirement corpus and monthly SIP requirements
- **Goal Calculator**: Calculate SIP needed for specific financial goals

### 📚 **Educational Content**
- **Personal Finance**: Budgeting, emergency funds, debt management
- **Investment Basics**: Mutual funds, stocks, asset allocation
- **Stock Market**: BSE/NSE guide, trading vs investing
- **Shares & Bonds**: Equity and debt investment fundamentals

### 🔐 **Security & Privacy**
- Secure authentication with Supabase
- Row-level security (RLS) for data protection
- Password management
- Data export functionality
- Account deletion with confirmation

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **React Router** - Client-side routing

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live data updates

### **Development Tools**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd finovo-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The project includes Supabase migrations in the `supabase/migrations/` directory:
- `20250629135207_polished_brook.sql` - Initial schema setup
- `20250629141230_tender_grove.sql` - RLS policy fixes

Run migrations through your Supabase dashboard or CLI.

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### **Core Tables**

#### `users`
- User profile information
- Financial preferences and goals
- Risk tolerance and investment experience

#### `expenses`
- Transaction tracking
- Category-based organization
- Type classification (need/want/savings)

#### `investments`
- Investment portfolio tracking
- Returns calculation
- Platform and type categorization

#### `financial_goals`
- Goal setting and tracking
- Priority and category management
- Progress monitoring

## 🎨 Key Components

### **Navigation**
- Responsive navigation with user authentication
- Profile dropdown with quick actions
- Mobile-friendly hamburger menu

### **Dashboard**
- Financial metrics overview
- Quick transaction entry
- Budget analysis visualization
- Recent transactions display

### **Calculators**
- Interactive financial calculators
- Real-time calculations
- Visual results presentation
- Export functionality

### **Educational Pages**
- Comprehensive financial guides
- External resource links
- Age-specific recommendations
- Indian market context

## 🔒 Security Features

### **Authentication**
- Email/password authentication
- Secure session management
- Password strength validation
- Account recovery options

### **Data Protection**
- Row Level Security (RLS)
- User data isolation
- Secure API endpoints
- Data encryption in transit

### **Privacy Controls**
- Data export functionality
- Account deletion options
- Privacy settings management
- Audit trail maintenance

## 📱 Responsive Design

- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancement**
- **Touch-friendly interfaces**
- **Accessible design patterns**

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deployment Options**
- **Netlify** (recommended)
- **Vercel**
- **AWS Amplify**
- **Firebase Hosting**

## 📊 Performance Features

- **Code splitting** for optimal loading
- **Lazy loading** of components
- **Optimized images** from Pexels
- **Efficient state management**
- **Minimal bundle size**

## 🧪 Development

### **Code Structure**
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── context/            # React context providers
├── lib/                # Utility libraries
└── types/              # TypeScript type definitions
```

### **Coding Standards**
- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture
- Separation of concerns

### **Best Practices**
- Modular component design
- Proper error handling
- Loading states management
- Responsive design patterns
- Accessibility compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow existing code patterns
- Add TypeScript types for new features
- Include responsive design considerations
- Test on multiple devices
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Pexels** for high-quality stock images
- **React community** for the amazing ecosystem

## 📞 Support

For support, email hello@finovo.com or create an issue in the repository.

## 🗺️ Roadmap

### **Upcoming Features**
- [ ] Mobile app development
- [ ] Advanced portfolio analytics
- [ ] AI-powered financial recommendations
- [ ] Integration with Indian banks
- [ ] Cryptocurrency tracking
- [ ] Tax planning tools
- [ ] Insurance marketplace
- [ ] Financial advisor matching

### **Enhancements**
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced charting
- [ ] Export to PDF reports
- [ ] Social sharing features
- [ ] Gamification elements

---

**Built with ❤️ for financial empowerment in India**

*Finovo - Your partner in financial growth*
