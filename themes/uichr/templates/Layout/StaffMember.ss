<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<div class="staffmember <% if $StaffPosition %>position<% end_if %>">
					<h1 class="title">$Title</h1>
					<!-- Position -->
					<% if $StaffPosition %>
						<h3 class="position">$StaffPosition</h3>
					<% end_if %>
					<hr />
					<img src="$StaffPhoto.SetWidth(400).URL" alt="$Title" class="staffmember-img">

					<!-- Email & Phone -->
					<% if $StaffEmailAddress || $StaffPhoneNumber %>
						<ul class="details">
							<% if $StaffEmailAddress %><li><strong>Email:</strong> <a href="mailto:$StaffEmailAddress">$StaffEmailAddress</a></li><% end_if %>
							<% if $StaffPhoneNumber %><li><strong>Phone:</strong> $StaffPhoneNumber</li><% end_if %>
						</ul>

					<% end_if %>

					$Content
					$Form
				</div>
			</section>
			<% include ChildPages %>
		</div><!-- end .col -->

		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-3  col-lg-pull-9 sidebar">
				<% include SideNav %>
				<% include Testimonial %>
			</div>
		<% end_if %>

	</div><!-- end .row -->
</main><!-- end .container -->
<% include PhotoGallery %>
<% include InteriorEventList %>
<% include Enroll %>