import React from "react"
export default function JobCard({
  id,
  title,
  company,
  location,
  postedDate,
  category,
  type,
  salary,
  experience,
  description,
  isUrgent = false,
  isRemote = false,
  companyLogo,
  onApply,
  onSave,
  isSaved = false,
  showSalary = false,
  className = "",
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const formatSalary = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
  }

  const handleApply = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onApply) {
      onApply(id)
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onSave) {
      onSave(id)
    }
  }

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group w-full relative ${className}`}
    >
      {/* Urgent Badge */}
      {isUrgent && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Urgent</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Company Logo */}
          {companyLogo && (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <img src={companyLogo || "/placeholder.svg"} alt={`${company} logo`} className="w-8 h-8 object-contain" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
            <p className="text-blue-600 font-medium mt-1 text-sm sm:text-base">{company}</p>
            {description && <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {type && <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">{type}</span>}
          {isRemote && (
            <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">Remote</span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{location}</span>
          </div>

          {category && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="text-sm">{category}</span>
            </div>
          )}

          {experience && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">{experience}</span>
            </div>
          )}

          {showSalary && salary && (
            <div className="flex items-center text-green-600 font-medium">
              <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-sm">{formatSalary(salary)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-gray-500">
          <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">{formatDate(postedDate)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <a
            href={`/jobs/${id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 shrink-0"
          >
            View Details
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {onApply && (
            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 shrink-0"
            >
              Quick Apply
            </button>
          )}
        </div>

        {onSave && (
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isSaved
                ? "text-red-600 bg-red-50 hover:bg-red-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
            title={isSaved ? "Remove from saved" : "Save job"}
          >
            <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
