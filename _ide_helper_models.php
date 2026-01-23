<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $image_path
 * @property string|null $alt_text
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereAltText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|BerandaSlide whereUpdatedAt($value)
 */
	class BerandaSlide extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $published_date
 * @property bool $is_active
 * @property int $views
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $image_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita wherePublishedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Berita whereViews($value)
 */
	class Berita extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $user_id
 * @property string|null $eventable_type
 * @property int|null $eventable_id
 * @property string $title
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property string|null $start_time
 * @property string|null $end_time
 * @property string $event_type
 * @property string|null $location
 * @property string|null $link
 * @property string|null $registration_url
 * @property string $color
 * @property string|null $icon
 * @property string $priority
 * @property bool $is_visible_to_mahasiswa
 * @property bool $is_visible_to_konselor
 * @property bool $is_visible_to_admin
 * @property bool $is_active
 * @property bool $is_featured
 * @property bool $send_notification
 * @property int|null $remind_before_days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent|null $eventable
 * @property-read string $date_range
 * @property-read bool $is_past
 * @property-read bool $is_today
 * @property-read bool $is_upcoming
 * @property-read string|null $time_range
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent inMonth($year, $month)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent visibleTo($role)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereEventableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToKonselor($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereIsVisibleToMahasiswa($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereRegistrationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereRemindBeforeDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereSendNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CalendarEvent withoutTrashed()
 */
	class CalendarEvent extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $company_name
 * @property string $location
 * @property \Illuminate\Support\Carbon $date
 * @property string $time
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CampusHiring whereUpdatedAt($value)
 */
	class CampusHiring extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string|null $email
 * @property string|null $instagram_username
 * @property string|null $whatsapp_number
 * @property string|null $phone_number
 * @property string|null $address_university
 * @property string|null $address_cdc
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereAddressCdc($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereAddressUniversity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereInstagramUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereWhatsappNumber($value)
 */
	class ContactInfo extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $counselor_id
 * @property int $slot_id
 * @property string $student_name
 * @property string $student_npm
 * @property string $student_phone
 * @property string $student_email
 * @property string|null $student_faculty
 * @property string|null $student_study_program
 * @property string|null $student_gender
 * @property string $topic
 * @property string $notes
 * @property \Illuminate\Support\Carbon $scheduled_date
 * @property string $scheduled_time
 * @property string $counselor_name
 * @property string $status
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $accepted_at
 * @property \Illuminate\Support\Carbon|null $rejected_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $cancelled_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @property-read \App\Models\Counselor $counselor
 * @property-read \App\Models\CounselingReport|null $report
 * @property-read \App\Models\CounselorSlot $slot
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking accepted()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking completed()
 * @method static \Database\Factories\CounselingBookingFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking forCounselor($counselorId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking forStudent($userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking pending()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCancelledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCounselorName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereRejectedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereScheduledDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereScheduledTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereSlotId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereStudentStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereTopic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingBooking withoutTrashed()
 */
	class CounselingBooking extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $booking_id
 * @property int $counselor_id
 * @property int $user_id
 * @property string $feedback
 * @property string|null $action_plan
 * @property string|null $recommendations
 * @property array<array-key, mixed>|null $documentation_files
 * @property int|null $session_duration
 * @property string $session_type
 * @property string|null $session_location
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CounselingBooking $booking
 * @property-read \App\Models\Counselor $counselor
 * @property-read mixed $photos_url
 * @property-read \App\Models\User $student
 * @method static \Database\Factories\CounselingReportFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereActionPlan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereBookingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereDocumentationFiles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereSessionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselingReport whereUserId($value)
 */
	class CounselingReport extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $user_id
 * @property string $name
 * @property string|null $email
 * @property string|null $phone
 * @property string $title
 * @property string|null $photo_path
 * @property int $is_active
 * @property int $order_column
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingBooking> $bookings
 * @property-read int|null $bookings_count
 * @property-read mixed $photo_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingReport> $reports
 * @property-read int|null $reports_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselorSlot> $slots
 * @property-read int|null $slots_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor ordered()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereOrderColumn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Counselor whereUserId($value)
 */
	class Counselor extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $image_path
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlide whereUpdatedAt($value)
 */
	class CounselorSlide extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $counselor_id
 * @property \Illuminate\Support\Carbon $date
 * @property string $start_time
 * @property string $end_time
 * @property bool $is_available
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CounselingBooking|null $booking
 * @property-read \App\Models\Counselor $counselor
 * @property-read mixed $formatted_date
 * @property-read mixed $formatted_time
 * @property-read mixed $time_string
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot available()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CounselorSlot whereUpdatedAt($value)
 */
	class CounselorSlot extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int|null $counselor_id
 * @property string $student_name
 * @property string $student_npm
 * @property string $student_email
 * @property string $student_phone
 * @property string|null $student_faculty
 * @property string|null $student_study_program
 * @property string $target_position
 * @property string|null $additional_notes
 * @property string $cv_file_path
 * @property string $cv_file_original_name
 * @property string $status
 * @property string|null $feedback_text
 * @property array<array-key, mixed>|null $feedback_files
 * @property string $priority
 * @property \Illuminate\Support\Carbon $submitted_at
 * @property \Illuminate\Support\Carbon|null $assigned_at
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Counselor|null $counselor
 * @property-read mixed $cv_file_url
 * @property-read mixed $feedback_file_urls
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview assigned()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview completed()
 * @method static \Database\Factories\CvReviewFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview forCounselor($counselorId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview forStudent($userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview inReview()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview priority($priority)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview submitted()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereAdditionalNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereAssignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCounselorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCvFileOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereCvFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereFeedbackFiles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereFeedbackText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereStudentStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereSubmittedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereTargetPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvReview withoutTrashed()
 */
	class CvReview extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $judul_template
 * @property string|null $deskripsi
 * @property string $kategori
 * @property string $sumber
 * @property string|null $url_template
 * @property string|null $file_path
 * @property string|null $url_preview
 * @property array<array-key, mixed>|null $tags
 * @property string|null $jenis_pekerjaan
 * @property string|null $tingkat_pengalaman
 * @property bool $is_active
 * @property bool $is_unggulan
 * @property int $urutan
 * @property int $jumlah_view
 * @property int $jumlah_klik
 * @property int $jumlah_download
 * @property int|null $dibuat_oleh
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read mixed $preview_url
 * @property-read \App\Models\User|null $pembuat
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CvTemplateView> $views
 * @property-read int|null $views_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate aktif()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate byKategori($kategori)
 * @method static \Database\Factories\CvTemplateFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate unggulan()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereDibuatOleh($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereIsUnggulan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJenisPekerjaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJudulTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahDownload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahKlik($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereJumlahView($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereKategori($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereSumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereTingkatPengalaman($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrlPreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrlTemplate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate whereUrutan($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplate withoutTrashed()
 */
	class CvTemplate extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $template_id
 * @property int|null $user_id
 * @property string $action_type
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CvTemplate $template
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereActionType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CvTemplateView whereUserId($value)
 */
	class CvTemplateView extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $npm
 * @property string $title
 * @property string|null $photo
 * @property string|null $email
 * @property string|null $linkedin_url
 * @property string|null $github_url
 * @property string|null $instagram_url
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereGithubUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereInstagramUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereLinkedinUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereNpm($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Developer whereUpdatedAt($value)
 */
	class Developer extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $image
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DeveloperDoc whereUpdatedAt($value)
 */
	class DeveloperDoc extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $company
 * @property string $location
 * @property string $type
 * @property string $work_model
 * @property string $experience_level
 * @property array<array-key, mixed> $categories
 * @property numeric|null $salary_min
 * @property numeric|null $salary_max
 * @property \Illuminate\Support\Carbon $deadline
 * @property \Illuminate\Support\Carbon $posted_date
 * @property string|null $logo
 * @property string|null $image
 * @property string $description
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $application_url
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereApplicationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereExperienceLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker wherePostedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSalaryMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSalaryMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Loker whereWorkModel($value)
 */
	class Loker extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $company
 * @property string $location
 * @property string $type
 * @property array<array-key, mixed> $categories
 * @property \Illuminate\Support\Carbon $deadline
 * @property \Illuminate\Support\Carbon $posted_date
 * @property string|null $logo
 * @property string|null $image
 * @property string|null $description
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $application_url
 * @property numeric|null $salary_min
 * @property numeric|null $salary_max
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereApplicationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang wherePostedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSalaryMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSalaryMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Magang whereUpdatedAt($value)
 */
	class Magang extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property array<array-key, mixed> $categories
 * @property string|null $location
 * @property \Illuminate\Support\Carbon|null $date
 * @property string|null $time
 * @property string $description
 * @property string $content
 * @property string|null $image
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrientasiDuniaKerja whereUpdatedAt($value)
 */
	class OrientasiDuniaKerja extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string|null $title
 * @property string $image_path
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaGallery whereUpdatedAt($value)
 */
	class PuskakaGallery extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $title
 * @property string|null $photo_path
 * @property int $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PuskakaTeam whereUpdatedAt($value)
 */
	class PuskakaTeam extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $code
 * @property string $title
 * @property string $nickname
 * @property string $description
 * @property array<array-key, mixed> $traits
 * @property array<array-key, mixed> $branding_strategies
 * @property array<array-key, mixed>|null $career_recommendations
 * @property bool $is_active
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecQuestion> $questions
 * @property-read int|null $questions_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereBrandingStrategies($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCareerRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereTraits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecCategory whereUpdatedAt($value)
 */
	class RiasecCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $category_id
 * @property string $question_text
 * @property int $order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecTestAnswer> $answers
 * @property-read int|null $answers_count
 * @property-read \App\Models\RiasecCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereQuestionText($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecQuestion whereUpdatedAt($value)
 */
	class RiasecQuestion extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $test_result_id
 * @property int $question_id
 * @property int $answer_value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\RiasecQuestion $question
 * @property-read \App\Models\RiasecTestResult $testResult
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereAnswerValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereQuestionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereTestResultId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestAnswer whereUpdatedAt($value)
 */
	class RiasecTestAnswer extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property array<array-key, mixed> $scores
 * @property array<array-key, mixed> $rankings
 * @property int $time_taken_seconds
 * @property int $total_questions_answered
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RiasecTestAnswer> $answers
 * @property-read int|null $answers_count
 * @property-read array $dominant_types
 * @property-read string $formatted_time
 * @property-read array $scores_array
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereRankings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereScores($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereTimeTakenSeconds($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereTotalQuestionsAnswered($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RiasecTestResult whereUserId($value)
 */
	class RiasecTestResult extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $image
 * @property \Illuminate\Support\Carbon $date
 * @property \Illuminate\Support\Carbon $time
 * @property string|null $speaker
 * @property string|null $organizer
 * @property string|null $location
 * @property string $type
 * @property string|null $description
 * @property string|null $benefits
 * @property string|null $content
 * @property string|null $registration_link
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereOrganizer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereRegistrationLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereSpeaker($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Seminar whereUpdatedAt($value)
 */
	class Seminar extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $content
 * @property string $provider_name
 * @property string|null $logo
 * @property array<array-key, mixed> $categories
 * @property string $type
 * @property string $level
 * @property string $mode
 * @property string|null $location
 * @property string|null $duration
 * @property \Illuminate\Support\Carbon|null $start_date
 * @property \Illuminate\Support\Carbon|null $end_date
 * @property bool $is_self_paced
 * @property numeric|null $fee
 * @property bool $is_free
 * @property string $fee_currency
 * @property string|null $requirements
 * @property string|null $benefits
 * @property string|null $syllabus
 * @property string|null $registration_url
 * @property \Illuminate\Support\Carbon|null $registration_deadline
 * @property bool $is_registration_open
 * @property string|null $brochure_pdf
 * @property string|null $certificate_sample
 * @property int|null $quota
 * @property int $enrolled_count
 * @property string $status
 * @property int $view_count
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property array<array-key, mixed>|null $tags
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property bool $is_active
 * @property-read \App\Models\CalendarEvent|null $calendarEvent
 * @property-read mixed $formatted_fee
 * @property-read mixed $is_deadline_soon
 * @property-read mixed $is_full
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi published()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereBrochurePdf($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCategories($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCertificateSample($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereEnrolledCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereFeeCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsFree($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsRegistrationOpen($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereIsSelfPaced($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereProviderName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRegistrationDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRegistrationUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereSyllabus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi whereViewCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Sertifikasi withoutTrashed()
 */
	class Sertifikasi extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $category
 * @property string|null $thumbnail
 * @property string $summary
 * @property string $content
 * @property int $reading_time
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik active()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik latest()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereReadingTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TipsDanTrik whereUpdatedAt($value)
 */
	class TipsDanTrik extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $username
 * @property string|null $id_number
 * @property string|null $faculty
 * @property string|null $study_program
 * @property string|null $phone
 * @property bool $is_profile_complete
 * @property string|null $password
 * @property string $role
 * @property string|null $photo_url
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselingBooking> $counselingBookings
 * @property-read int|null $counseling_bookings_count
 * @property-read \App\Models\Counselor|null $counselor
 * @property-read string $formatted_phone
 * @property-read string $id_label
 * @property-read \LdapRecord\Models\Model|null $ldap
 * @property-read string $whatsapp_link
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CounselorSlot> $slots
 * @property-read int|null $slots_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereFaculty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIdNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsProfileComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStudyProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUsername($value)
 */
	class User extends \Eloquent implements \Filament\Models\Contracts\FilamentUser, \LdapRecord\Laravel\Auth\LdapAuthenticatable, \LdapRecord\Laravel\LdapImportable {}
}

