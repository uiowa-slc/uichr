<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<%-- <h1 class="page-title">$Title</h1> --%>
			<h1 class="page-title">
				$CurrentProfile.FirstName $CurrentProfile.Surname
			</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="col-lg-8 children">
				<div class="clearfix">
					<% if $CurrentProfile.BlogProfileImage %>
					<div class="profile-image">
						<img src="$CurrentProfile.BlogProfileImage.ScaleWidth(300).URL" alt="$CurrentProfile.FirstName $CurrentProfile.Surname" class="right">
					</div>
					<% end_if %>
					<div class="profile-summary">
						<p>$CurrentProfile.BlogProfileSummary</p>
					</div>
				</div>

				<% if $PaginatedList.Exists %>
					<h2>Posts by $CurrentProfile.FirstName $CurrentProfile.Surname for $Title:</h2>
					<% loop $PaginatedList %>
						<% include NewsCard %>
					<% end_loop %>
				<% end_if %>

				$Form

				<% with $PaginatedList %>
					<% include Pagination %>
				<% end_with %>
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% include SideBar %>
		</div><!-- end .row -->
	</section>

</main><!-- end .container -->