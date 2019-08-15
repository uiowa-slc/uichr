<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">$Title</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<%-- Sub Navigation --%>
			<% if $Children || $Parent %>
				<% include SideNav %>
			<% end_if %>

			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="<% if $Children || $Parent %>col-lg-8 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
				<div class="staffimg">
					<img src="$StaffPhoto.FocusFill(400,500).URL" alt="$Title">
					<!-- Email & Phone -->

				</div>
				<div class="staffbio">
					<% if $StaffEmailAddress || $StaffPhoneNumber || $StaffPosition %>
						<div class="staffmeta">
							<% if $StaffPosition %>
								<p class="position"><strong>Position: </strong>$StaffPosition</p>
							<% end_if %>
							<% if $StaffEmailAddress %>
								<p class="email"><strong>Email:</strong> <a href="mailto:$StaffEmailAddress">$StaffEmailAddress</a></p>
							<% end_if %>
							<% if $StaffPhoneNumber %>
								<p class="phone"><strong>Phone:</strong> $StaffPhoneNumber</p>
							<% end_if %>
						</div>
					<% end_if %>
					$Content
				</div>
				<% if $StaffResearch %>
					<hr>
					<h2>Research, Projects, and Activities</h2>
					$StaffResearch
				<% end_if %>
				<% if $StaffCV %>
					<hr>
					<p><a href="$StaffCV.URL" target="_blank" class="btn btn-default btn-lg">Download CV</a></p>
				<% end_if %>
				$Form
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<% include SideBar %>
			<% end_if %>
		</div><!-- end .row -->
	</section>
</main><!-- end .container -->

<!-- Previous Article Link -->
<div class="staff-prevnext">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				<% if PreviousPage %>
					<a href="$PreviousPage.Link" class="prev link">
						<span class="arrows">&larr;</span>
						<% if $PreviousPage.StaffPhoto %><img src="$PreviousPage.StaffPhoto.FocusFill(100,100).URL" alt="Previous Staff Member"><% end_if %>
						<p class="staff-prevnext-name">
							<span class="title">$PreviousPage.Title</span>
							<% if $PreviousPage.StaffPosition %><span class="position">$PreviousPage.StaffPosition</span><% end_if %>
						</p>
					</a>
				<% end_if %>
				<% if NextPage %>
					<a href="$NextPage.Link" class="next link">
						<p class="staff-prevnext-name">
							<span class="title">$NextPage.Title</span>
							<% if $NextPage.StaffPosition %><span class="position">$NextPage.StaffPosition</span><% end_if %>
						</p>
						<% if $NextPage.StaffPhoto %><img src="$NextPage.StaffPhoto.FocusFill(100,100).URL" alt="Next Staff Member"><% end_if %>
						<span class="arrows">&rarr;</span>
					</a>
				<% end_if %>
			</div>
		</div>
	</div>
</div>
